"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ label = "Loading" }: { label?: string }) {
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (t: number) => {
      const dt = t - start;
      const next = Math.min(92, 8 + (dt / 1200) * 84);
      setProgress(next);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background">
      <div className="w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6"
        >
          <motion.p
            className="text-center text-xs font-medium tracking-[0.35em] text-muted"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {label.toUpperCase()}
          </motion.p>

          <motion.h1
            className="mt-3 text-center text-2xl font-semibold"
            animate={{
              textShadow: [
                "0 0 0px rgba(124,58,237,0)",
                "0 0 26px rgba(124,58,237,0.35)",
                "0 0 0px rgba(124,58,237,0)",
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="gradient-text">NEON PORTFOLIO</span>
          </motion.h1>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Initializing</span>
              <span className="text-foreground/90">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full [background:linear-gradient(90deg,var(--accent-2),var(--accent-1),var(--accent-3))]"
                initial={{ width: "8%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
