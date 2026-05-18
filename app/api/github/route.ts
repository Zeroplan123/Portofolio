import { NextRequest } from "next/server";

import { getGitHubDashboardCached } from "@/lib/github";
import { site } from "@/lib/site";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user =
    searchParams.get("user") ||
    process.env.GITHUB_USERNAME ||
    site.githubUsername;

  try {
    const dashboard = await getGitHubDashboardCached(user);
    return Response.json(dashboard);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json(
      {
        error: true,
        message,
        hint: "Set env GITHUB_USERNAME and (optional) GITHUB_TOKEN in .env.local for higher rate limits + contribution graph.",
      },
      { status: 500 }
    );
  }
}

