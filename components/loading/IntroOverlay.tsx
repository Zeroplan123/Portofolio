"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import LoadingScreen from "@/components/loading/LoadingScreen";

export default function IntroOverlay() {
  const [show, setShow] = useState(() => {
    try {
      const seen = sessionStorage.getItem("intro_seen");
      if (seen) return false;
      sessionStorage.setItem("intro_seen", "1");
      return true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!show) return;
    const t = window.setTimeout(() => setShow(false), 900);
    return () => window.clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <LoadingScreen label="Booting up" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
