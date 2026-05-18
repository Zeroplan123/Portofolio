"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

export default function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

