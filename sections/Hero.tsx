"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Code2, Mail } from "lucide-react";
import Image from "next/image";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HeroThree from "@/components/visual/HeroThree";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section id="home" className="relative pt-16 sm:pt-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 px-6 py-14 backdrop-blur-xl sm:px-10 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(900px circle at 18% 18%, rgba(255,255,255,0.10), transparent 45%), radial-gradient(700px circle at 82% 30%, rgba(255,255,255,0.08), transparent 46%), radial-gradient(600px circle at 50% 100%, rgba(255,255,255,0.06), transparent 50%)",
            }}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs font-medium tracking-[0.32em] text-muted"
              >
                {site.location} • {site.role}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-6xl"
              >
                Hi, I&apos;m <span className="gradient-text">{site.name}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 max-w-xl text-pretty text-sm leading-7 text-muted sm:text-base"
              >
                {site.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
              >
                <Button href={site.cvUrl} variant="primary" external>
                  Download CV <ArrowRight size={16} className="opacity-80" />
                </Button>
                <Button href="#projects" variant="secondary">
                  View projects <ArrowDown size={16} className="opacity-80" />
                </Button>
                <Button
                  href={`mailto:${site.email}`}
                  variant="secondary"
                  external
                >
                  Email <Mail size={16} className="opacity-80" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-wrap items-center gap-2 text-xs text-muted"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/6">
                    <Code2 size={14} className="opacity-80" />
                  </span>
                  Available for collaboration
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-sm"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-surface-2">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-90 [background:radial-gradient(900px_circle_at_40%_30%,rgba(255,255,255,0.10),transparent_52%)]"
                />
                <Image
                  src={site.heroImage}
                  alt={site.name}
                  fill
                  preload
                  unoptimized={site.heroImage.endsWith(".svg")}
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover"
                />
                <HeroThree className="mix-blend-screen opacity-55" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 [background:linear-gradient(to_top,rgba(22,22,22,0.85),transparent)]" />
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-10 -z-10 opacity-70 blur-3xl [background:radial-gradient(closest-side,rgba(255,255,255,0.10),transparent)]"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
