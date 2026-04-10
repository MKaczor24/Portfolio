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
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.5, 1],
    },
  },
});

export const riseIn = (delay = 0, distance = 16): Variants => ({
  hidden: { y: distance },
  visible: {
    y: 0,
    transition: {
      duration: 1.0,
      delay,
      ease: [0.22, 1, 0.5, 1] as [number, number, number, number],
    },
  },
});

export const stagger = (
  delayChildren = 0,
  staggerChildren = 0.1,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});
