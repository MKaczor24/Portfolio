import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section/Section";
import { SectionHeading } from "@/components/section/SectionHeading";
import {
  heapUnderflowImg,
  reCropImg,
  placeholderImg,
  authAppImg,
  wospImg,
  miniMeteoImg,
  shoppingImg,
} from "@/assets";

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

  const handleMobileHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 979) {
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

      <div className="section-reveal grid grid-cols-1 gap-6 [animation-delay:80ms] sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.title} className="group h-100 perspective-distant">
            <div
              className="relative h-full w-full transition-transform duration-700 transform-3d group-hover:transform-[rotateY(180deg)]"
              onClick={handleMobileHover}
            >
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
          </div>
        ))}
      </div>
      <div className="section-reveal mx-auto mt-18 w-full max-w-7xl [animation-delay:160ms]">
        <SectionHeading
          overline={t("projects.side.overline")}
          title={t("projects.side.title")}
          className="mb-4"
          overlineClassName="text-primary/80 text-xs tracking-[0.16em]"
          titleClassName="text-xl sm:text-2xl"
        />

        <div className="no-scrollbar flex flex-col items-center justify-start gap-8 overflow-x-auto py-4 lg:flex-row">
          {sideProjects.map((project) => (
            <div
              key={project.title}
              className="group h-60 w-60 perspective-normal"
            >
              <div
                className="relative h-full w-full transition-transform duration-500 transform-3d group-hover:transform-[rotateY(180deg)]"
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
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
