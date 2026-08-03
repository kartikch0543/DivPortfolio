"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = { children: ReactNode; className?: string; delay?: number };

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
