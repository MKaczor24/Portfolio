import type { ElementType, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  overline?: ReactNode;
  title: ReactNode;
  className?: string;
  overlineClassName?: string;
  titleClassName?: string;
  titleAs?: ElementType;
};

export function SectionHeading({
  overline,
  title,
  className,
  overlineClassName,
  titleClassName,
  titleAs,
}: SectionHeadingProps) {
  const TitleTag = titleAs ?? "h2";
  const shouldReduceMotion = useReducedMotion();

  const revealState = shouldReduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };

  return (
    <motion.div
      className={cn("mb-10 flex flex-col gap-2", className)}
      variants={fadeUp(0.04)}
      {...revealState}
    >
      {overline ? (
        <p
          className={cn(
            "text-primary text-sm tracking-[0.18em] uppercase",
            overlineClassName,
          )}
        >
          {overline}
        </p>
      ) : null}
      <TitleTag
        className={cn(
          "text-foreground text-3xl font-semibold sm:text-4xl",
          titleClassName,
        )}
      >
        {title}
      </TitleTag>
    </motion.div>
  );
}
