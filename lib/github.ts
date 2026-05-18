import "server-only";

import { unstable_cache } from "next/cache";

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
};

export type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
};

export type ContributionDay = { date: string; count: number };
export type ContributionWeek = ContributionDay[];

export type GitHubDashboard = {
  user: GitHubUser;
  topRepos: GitHubRepo[];
  recentEvents: Array<{
    id: string;
    type: string;
    repo: { name: string };
    created_at: string;
  }>;
  contributions?: {
    total: number;
    weeks: ContributionWeek[];
  };
  meta: {
    hasToken: boolean;
    generatedAt: string;
  };
};

function env(name: string) {
  const v = process.env[name];
  return v && v.trim().length > 0 ? v.trim() : undefined;
}

function ghHeaders(hasToken: boolean) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = env("GITHUB_TOKEN");
  if (hasToken && token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function ghFetchJson<T>(url: string, hasToken: boolean): Promise<T> {
  const res = await fetch(url, {
    headers: ghHeaders(hasToken),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GitHub API error (${res.status}): ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

async function ghGraphQL<T>(query: string, variables: Record<string, unknown>) {
  const token = env("GITHUB_TOKEN");
  if (!token) throw new Error("Missing GITHUB_TOKEN for GraphQL requests.");

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...ghHeaders(true),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GitHub GraphQL error (${res.status}): ${text || res.statusText}`);
  }

  const json = (await res.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (json.errors?.length) throw new Error(json.errors[0]?.message || "GraphQL error");
  if (!json.data) throw new Error("GraphQL returned no data");
  return json.data;
}

async function getDashboard(userLogin: string): Promise<GitHubDashboard> {
  const hasToken = Boolean(env("GITHUB_TOKEN"));

  const [user, repos, events] = await Promise.all([
    ghFetchJson<GitHubUser>(`https://api.github.com/users/${userLogin}`, hasToken),
    ghFetchJson<GitHubRepo[]>(
      `https://api.github.com/users/${userLogin}/repos?per_page=100&sort=updated`,
      hasToken
    ),
    ghFetchJson<GitHubDashboard["recentEvents"]>(
      `https://api.github.com/users/${userLogin}/events/public?per_page=20`,
      hasToken
    ).catch(() => []),
  ]);

  const topRepos = repos
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  let contributions: GitHubDashboard["contributions"] | undefined = undefined;
  if (hasToken) {
    const data = await ghGraphQL<{
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: Array<{
              contributionDays: Array<{ date: string; contributionCount: number }>;
            }>;
          };
        };
      };
    }>(
      `query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }`,
      { login: userLogin }
    );

    const cal = data.user.contributionsCollection.contributionCalendar;
    contributions = {
      total: cal.totalContributions,
      weeks: cal.weeks.map((w) =>
        w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
      ),
    };
  }

  return {
    user,
    topRepos,
    recentEvents: events.slice(0, 10),
    contributions,
    meta: { hasToken, generatedAt: new Date().toISOString() },
  };
}

export const getGitHubDashboardCached = unstable_cache(
  async (userLogin: string) => getDashboard(userLogin),
  ["github-dashboard"],
  { revalidate: 600, tags: ["github-dashboard"] }
);

