"use client";

import { motion } from "framer-motion";
import { GitFork, GitPullRequest, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { GitHubDashboard } from "@/lib/github";
import { site } from "@/lib/site";

function level(count: number) {
  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 7) return 2;
  if (count < 13) return 3;
  return 4;
}

function HeatCell({ count, date }: { count: number; date: string }) {
  const l = level(count);
  const colors = [
    "bg-white/6",
    "bg-white/10",
    "bg-white/14",
    "bg-white/18",
    "bg-white/24",
  ];
  return (
    <div
      title={`${date}: ${count} contributions`}
      className={`h-[10px] w-[10px] rounded-[3px] border border-white/5 ${colors[l]} transition hover:scale-110`}
    />
  );
}

function ContributionGraph({
  contributions,
}: {
  contributions: NonNullable<GitHubDashboard["contributions"]>;
}) {
  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="min-w-[820px]">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold tracking-tight">
            Contribution graph
          </p>
          <p className="text-xs text-muted">
            Total 1 tahun:{" "}
            <span className="text-foreground/90">{contributions.total}</span>
          </p>
        </div>

        <div className="mt-4 flex gap-[6px]">
          {contributions.weeks.map((week, idx) => (
            <div key={idx} className="flex flex-col gap-[6px]">
              {week.map((d) => (
                <HeatCell key={d.date} date={d.date} count={d.count} />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-muted">
          <span>Less</span>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((l) => (
              <div
                key={l}
                className={[
                  "h-[10px] w-[10px] rounded-[3px] border border-white/5",
                  l === 0
                    ? "bg-white/6"
                    : l === 1
                      ? "bg-white/10"
                      : l === 2
                        ? "bg-white/14"
                        : l === 3
                          ? "bg-white/18"
                          : "bg-white/24",
                ].join(" ")}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default function GitHub() {
  const [data, setData] = useState<GitHubDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const username = useMemo(
    () => process.env.NEXT_PUBLIC_GITHUB_USERNAME || site.githubUsername,
    []
  );

  useEffect(() => {
    let alive = true;
    queueMicrotask(() => {
      if (!alive) return;
      setLoading(true);
      setError(null);
    });

    fetch(`/api/github?user=${encodeURIComponent(username)}`)
      .then((r) => r.json())
      .then((json) => {
        if (!alive) return;
        if (json?.error) {
          setError(json.message || "Failed to load GitHub data.");
          setData(null);
        } else {
          setData(json as GitHubDashboard);
        }
      })
      .catch((e) => {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Failed to load GitHub data.");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [username]);

  return (
    <section id="github" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="GITHUB"
          title="Developer dashboard"
          description="Aktivitas GitHub real-time: contribution graph, repo populer, dan statistik."
        />

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <Card className="h-full">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold tracking-tight">
                    {data ? data.user.login : `@${username}`}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {loading
                      ? "Mengambil data GitHub..."
                      : error
                        ? "Gagal mengambil data."
                        : data?.meta.hasToken
                          ? "Graph + stats via GitHub API (token aktif)."
                          : "Tanpa token: graph kontribusi mungkin tidak tampil."}
                  </p>
                </div>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground/90 backdrop-blur-md transition hover:bg-white/8"
                >
                  Buka profil ↗
                </a>
              </div>

              {error ? (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted">
                  <p className="font-medium text-foreground/90">Error</p>
                  <p className="mt-1 leading-7">{error}</p>
                  <p className="mt-3 text-xs">
                    Tips: buat `.env.local` dengan `GITHUB_USERNAME` dan
                    `GITHUB_TOKEN` (optional untuk rate limit + contribution graph).
                  </p>
                </div>
              ) : null}

              {data?.contributions ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6"
                >
                  <ContributionGraph contributions={data.contributions} />
                </motion.div>
              ) : (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted">
                  <p className="font-medium text-foreground/90">
                    Contribution graph
                  </p>
                  <p className="mt-1 leading-7">
                    Aktifkan `GITHUB_TOKEN` untuk menampilkan graph kontribusi via
                    GitHub GraphQL API.
                  </p>
                </div>
              )}
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="grid gap-6">
              <Card>
                <p className="text-sm font-semibold tracking-tight">Stats</p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "Repos",
                      value: data?.user.public_repos ?? "—",
                    },
                    { label: "Followers", value: data?.user.followers ?? "—" },
                    { label: "Following", value: data?.user.following ?? "—" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center"
                    >
                      <p className="text-lg font-semibold">{s.value}</p>
                      <p className="mt-1 text-xs text-muted">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <p className="text-sm font-semibold tracking-tight">
                  Recent activity
                </p>
                <div className="mt-4 space-y-2">
                  {(data?.recentEvents || []).slice(0, 6).map((ev) => (
                    <div
                      key={ev.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs"
                    >
                      <span className="truncate text-foreground/90">
                        {ev.type.replace("Event", "")} • {ev.repo.name}
                      </span>
                      <span className="shrink-0 text-muted">
                        {new Date(ev.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                  {!loading && data && data.recentEvents.length === 0 ? (
                    <p className="text-xs text-muted">Tidak ada event publik.</p>
                  ) : null}
                </div>
              </Card>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold tracking-tight">Top repos</p>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <Star size={14} className="opacity-80" /> Stars
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork size={14} className="opacity-80" /> Forks
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitPullRequest size={14} className="opacity-80" /> Updates
                </span>
              </div>
            </div>

            <Stagger className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {(data?.topRepos || []).map((repo) => (
                <StaggerItem key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:glow-ring hover:bg-white/7"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold tracking-tight">
                        {repo.name}
                      </p>
                      <span className="text-xs text-muted transition group-hover:text-foreground/80">
                        ↗
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-6 text-muted">
                      {repo.description || "No description."}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
                      <Badge className="bg-white/3">
                        <span className="inline-flex items-center gap-1">
                          <Star size={14} className="opacity-80" />
                          {repo.stargazers_count}
                        </span>
                      </Badge>
                      <Badge className="bg-white/3">
                        <span className="inline-flex items-center gap-1">
                          <GitFork size={14} className="opacity-80" />
                          {repo.forks_count}
                        </span>
                      </Badge>
                      {repo.language ? (
                        <Badge className="bg-white/3">{repo.language}</Badge>
                      ) : null}
                    </div>
                  </a>
                </StaggerItem>
              ))}

              {!loading && data && data.topRepos.length === 0 ? (
                <p className="text-sm text-muted">Repo tidak ditemukan.</p>
              ) : null}
            </Stagger>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
