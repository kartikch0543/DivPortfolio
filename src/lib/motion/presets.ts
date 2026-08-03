import type { Transition, Variants } from "framer-motion";

export const motionTransition: Transition = {
  duration: 0.24,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: motionTransition },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: motionTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: motionTransition },
};

export const staggerChildren: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const hoverLift = {
  y: -3,
  transition: motionTransition,
};

export const pageTransition: Transition = {
  ...motionTransition,
  duration: 0.28,
};
