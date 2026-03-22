import type { ElementType, ReactNode } from "react";
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

  return (
    <div className={cn("section-reveal mb-10 flex flex-col gap-2", className)}>
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
    </div>
  );
}
