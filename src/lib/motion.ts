import type { Variants } from "framer-motion";

export const revealViewport = {
  once: true,
  amount: 0.18,
};

export const fadeUp = (delay = 0, distance = 16): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export const stagger = (
  delayChildren = 0,
  staggerChildren = 0.08,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});
