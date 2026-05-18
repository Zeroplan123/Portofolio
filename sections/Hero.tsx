"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Mail } from "lucide-react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative pt-14 sm:pt-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-16 backdrop-blur-xl sm:px-10 sm:py-20">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-80"
            animate={{
              backgroundPositionX: ["0%", "100%", "0%"],
              backgroundPositionY: ["0%", "100%", "0%"],
            }}
            transition={{ duration: 14, ease: "linear", repeat: Infinity }}
            style={{
              backgroundImage:
                "radial-gradient(900px circle at 20% 10%, rgba(34,211,238,0.14), transparent 45%), radial-gradient(800px circle at 80% 20%, rgba(124,58,237,0.18), transparent 42%), radial-gradient(700px circle at 50% 90%, rgba(52,211,153,0.10), transparent 44%)",
              backgroundSize: "140% 140%",
            }}
          />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs font-medium tracking-[0.32em] text-muted"
            >
              {site.location} • {site.role}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-6xl"
            >
              <span className="gradient-text">{site.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-muted sm:text-base"
            >
              {site.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            >
              <Button href={site.cvUrl} variant="primary" external>
                Lihat CV <ArrowRight size={16} className="opacity-80" />
              </Button>
              <Button href={site.social.github} variant="secondary" external>
                GitHub <Code2 size={16} className="opacity-80" />
              </Button>
              <Button href="#contact" variant="secondary">
                Contact <Mail size={16} className="opacity-80" />
              </Button>
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="mt-12 h-px w-full max-w-xl opacity-70 [background:linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]"
              initial={{ opacity: 0, scaleX: 0.7 }}
              animate={{ opacity: 0.7, scaleX: 1 }}
              transition={{ delay: 0.28, duration: 0.9 }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
