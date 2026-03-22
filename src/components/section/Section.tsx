import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  as?: ElementType;
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  as,
}: SectionProps) {
  const Component = as ?? "section";

  return (
    <Component
      id={id}
      className={cn(
        "relative isolate scroll-mt-4 overflow-hidden px-6 py-20 md:scroll-mt-10 md:px-10 lg:px-16",
        className,
      )}
    >
      <div className={cn("mx-auto w-full max-w-7xl", containerClassName)}>
        {children}
      </div>
    </Component>
  );
}
