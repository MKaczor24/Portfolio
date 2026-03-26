import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";
import type React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section/Section";
import { SectionHeading } from "@/components/section/SectionHeading";
import { fadeUp, revealViewport, stagger } from "@/lib/motion";
import {
  heapUnderflowImg,
  reCropImg,
  placeholderImg,
  authAppImg,
  wospImg,
  miniMeteoImg,
  shoppingImg,
} from "@/assets";

const MOBILE_FLIP_HINT_KEY = "projects-mobile-flip-hint-seen";
const MOBILE_BREAKPOINT = 1248;

const projects = [
  {
    title: "HeapUnderflow",
    summaryKey: "projects.main.heap.summary",
    image: heapUnderflowImg,
    altKey: "projects.main.heap.alt",
    stack: ["React", "Tailwind", "Next.js", "Appwrite"],
    liveHref: "https://heap-underflow.vercel.app/",
    codeHref: "https://github.com/MKaczor24/HeapUnderflow",
  },
  {
    title: "ReCrop",
    summaryKey: "projects.main.recrop.summary",
    image: reCropImg,
    altKey: "projects.main.recrop.alt",
    stack: ["React", "Tailwind", "Next.js", "PostgreSQL"],
    liveHref: "https://recrop.vercel.app",
    codeHref: "https://github.com/MKaczor24/ReCrop",
  },
  {
    title: "Next Case Study",
    summaryKey: "projects.main.nextCaseStudy.summary",
    image: placeholderImg,
    altKey: "projects.main.nextCaseStudy.alt",
    stack: ["React", "Tailwind", "Next.js", "MongoDB"],
    liveHref: "#",
    codeHref: "#",
  },
];

const sideProjects = [
  {
    title: "AuthApp",
    summaryKey: "projects.side.authApp.summary",
    image: authAppImg,
    altKey: "projects.side.authApp.alt",
    stack: ["React", "Next.js", "MongoDB"],
  },

  {
    title: "AKAI for WOŚP",
    summaryKey: "projects.side.akai.summary",
    image: wospImg,
    altKey: "projects.side.akai.alt",
    stack: ["React", "PHP/Laravel", "PostgreSQL"],
  },

  {
    title: "MiniMeteo",
    summaryKey: "projects.side.miniMeteo.summary",
    image: miniMeteoImg,
    altKey: "projects.side.miniMeteo.alt",
    stack: ["React", "Tailwind", "Vite"],
  },

  {
    title: "Shopping Cart",
    summaryKey: "projects.side.shopping.summary",
    image: shoppingImg,
    altKey: "projects.side.shopping.alt",
    stack: ["React", "Tailwind", "Vite"],
  },
];

export default function Projects() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [showMobileFlipHint, setShowMobileFlipHint] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.innerWidth >= MOBILE_BREAKPOINT) return false;
    return window.localStorage.getItem(MOBILE_FLIP_HINT_KEY) !== "1";
  });

  const revealState = shouldReduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };

  useEffect(() => {
    if (!showMobileFlipHint) return;

    const timeoutId = window.setTimeout(() => {
      setShowMobileFlipHint(false);
      window.localStorage.setItem(MOBILE_FLIP_HINT_KEY, "1");
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [showMobileFlipHint]);

  const dismissMobileFlipHint = () => {
    if (!showMobileFlipHint) return;
    setShowMobileFlipHint(false);
    window.localStorage.setItem(MOBILE_FLIP_HINT_KEY, "1");
  };

  const handleMobileHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      dismissMobileFlipHint();
      const card = e.currentTarget;
      if (card) {
        card.classList.toggle("transform-[rotateY(180deg)]");
      }
    }
  };

  return (
    <Section id="projects">
      <SectionHeading
        overline={t("projects.overline")}
        title={t("projects.title")}
      />

      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={stagger(0.08, 0.09)}
        {...revealState}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="group h-100 perspective-distant"
            variants={fadeUp(0)}
          >
            <div
              className="relative h-full w-full transition-transform duration-700 transform-3d group-hover:transform-[rotateY(180deg)]"
              onClick={handleMobileHover}
            >
              {index === 0 && showMobileFlipHint ? (
                <motion.div
                  className="bg-primary text-primary-foreground border-foreground/20 pointer-events-none absolute inset-x-8 top-8 z-20 rounded-lg border px-4 py-2 text-center text-xs font-semibold tracking-wide shadow-xl lg:hidden"
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{
                    opacity: [0, 0.5, 1, 1, 0.5, 0],
                    y: [-4, 0, 0, 0, -4],
                    scale: [0.98, 1, 1.02, 1, 0.98],
                  }}
                  transition={{
                    duration: 3,
                    times: [0, 0.1, 0.5, 0.9, 0.95, 1],
                    repeat: 1,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissMobileFlipHint();
                  }}
                >
                  {t("projects.mobileFlipHint")}
                </motion.div>
              ) : null}

              <div className="border-border/60 from-card/85 to-card/45 shadow-background absolute inset-0 rounded-2xl border bg-linear-to-br p-4 shadow-md backdrop-blur-md backface-hidden">
                <img
                  src={project.image}
                  alt={t(project.altKey)}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-xl object-cover"
                />
                <div className="bg-background/40 pointer-events-none absolute inset-x-4 bottom-4 rounded-b-xl px-4 py-3 backdrop-blur-sm">
                  <h3 className="text-foreground text-base font-semibold">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="border-border/60 from-card to-card/80 shadow-background absolute inset-0 flex transform-[rotateY(180deg)] flex-col justify-between rounded-2xl border bg-linear-to-br p-6 shadow-md backdrop-blur-md backface-hidden">
                <div>
                  <h3 className="text-foreground text-base font-semibold">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground/90 mt-3 text-sm leading-relaxed">
                    {t(project.summaryKey)}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <li key={item}>
                        <Badge variant="outline" className="rounded-full">
                          {item}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button
                    asChild
                    className="h-9 rounded-lg px-4 text-sm font-semibold"
                  >
                    <a href={project.liveHref} target="_blank" rel="noreferrer">
                      {t("projects.buttons.live")}
                      <IconArrowUpRight size={16} />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-9 rounded-lg px-4 text-sm font-semibold"
                  >
                    <a href={project.codeHref} target="_blank" rel="noreferrer">
                      {t("projects.buttons.code")}
                      <IconBrandGithub size={16} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="mx-auto mt-18 w-full max-w-7xl"
        variants={fadeUp(0.14)}
        {...revealState}
      >
        <SectionHeading
          overline={t("projects.side.overline")}
          title={t("projects.side.title")}
          className="mb-4"
          overlineClassName="text-primary/80 text-xs tracking-[0.16em]"
          titleClassName="text-xl sm:text-2xl"
        />

        <motion.div
          className="no-scrollbar flex flex-col items-center justify-start gap-8 overflow-x-auto py-4 lg:flex-row"
          variants={stagger(0.04, 0.07)}
          {...revealState}
        >
          {sideProjects.map((project) => (
            <motion.div
              key={project.title}
              className="group h-60 w-60 perspective-normal"
              variants={fadeUp(0)}
            >
              <div
                className="relative h-full w-full overscroll-y-none transition-transform duration-500 transform-3d group-hover:transform-[rotateY(180deg)]"
                onClick={handleMobileHover}
              >
                <div className="border-border/40 from-card/70 to-card/35 shadow-background absolute inset-0 rounded-2xl border bg-linear-to-br p-2 shadow-md backdrop-blur-sm backface-hidden">
                  <img
                    src={project.image}
                    alt={t(project.altKey)}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full rounded-xl object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-b-xl bg-black/25 px-3 py-2 backdrop-blur-xs">
                    <h3 className="text-foreground text-base font-semibold">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="border-border/40 from-card/85 to-card/60 shadow-background absolute inset-0 flex transform-[rotateY(180deg)] flex-col justify-between rounded-2xl border bg-linear-to-br p-3 shadow-md backdrop-blur-sm backface-hidden">
                  <div>
                    <h3 className="text-foreground text-base font-semibold">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground/90 mt-2 text-sm leading-relaxed">
                      {t(project.summaryKey)}
                      <br />
                      {project.title === "AKAI for WOŚP" && (
                        <a
                          href="https://github.com/akai-org/wosp-puszki"
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary text-xs hover:underline"
                        >
                          {t("projects.side.akai.repo")}
                        </a>
                      )}
                    </p>
                  </div>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <li key={item}>
                        <Badge
                          variant="outline"
                          className="rounded-full text-xs"
                        >
                          {item}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
