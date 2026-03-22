import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import type React from "react";
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
    summary:
      "HeapUnderflow is a full-stack Q&A web application where users can ask technical questions, post answers, and vote on content. It features a modern dark-themed UI with smooth animations and a fully responsive layout.",
    image: heapUnderflowImg,
    alt: "HeapUnderflow project preview",
    stack: ["React", "Tailwind", "Next.js", "Appwrite"],
    liveHref: "https://heap-underflow.vercel.app/",
    codeHref: "https://github.com/MKaczor24/HeapUnderflow",
  },
  {
    title: "ReCrop",
    summary:
      "ReCrop is a full-stack web application that empowers users to easily manipulate images and videos through a modern, responsive UI. It offers tools for resizing, background removal and replacement, video compression, and file conversion — all powered by leading cloud services and AI integrations.",
    image: reCropImg,
    alt: "ReCrop project preview",
    stack: ["React", "Tailwind", "Next.js", "PostgreSQL"],
    liveHref: "https://recrop.vercel.app",
    codeHref: "https://github.com/MKaczor24/ReCrop",
  },
  {
    title: "Next Case Study",
    summary:
      "An upcoming production project — architecture decisions and measurable outcomes documented along the way.",
    image: placeholderImg,
    alt: "Upcoming project placeholder",
    stack: ["React", "Tailwind", "Next.js", "MongoDB"],
    liveHref: "#",
    codeHref: "#",
  },
];

const sideProjects = [
  {
    title: "AuthApp",
    summary:
      "A simple authentication app featuring user registration, login, and protected routes utilizing MongoDB and JWT",
    image: authAppImg,
    alt: "AuthApp preview",
    stack: ["React", "Next.js", "MongoDB"],
  },

  {
    title: "AKAI for WOŚP",
    summary:
      "I've contributed to 2026 WOŚP final by fixing a few bugs in the frontend of AKAI's app this year.",
    image: wospImg,
    alt: "AKAI for WOŚP preview",
    stack: ["React", "PHP/Laravel", "PostgreSQL"],
  },

  {
    title: "MiniMeteo",
    summary:
      "A simple weather app utilizing OpenMeteo API to fetch and display current weather conditions based on user input.",
    image: miniMeteoImg,
    alt: "MiniMeteo preview",
    stack: ["React", "Tailwind", "Vite"],
  },

  {
    title: "Shopping Cart",
    summary:
      "A basic shopping cart application allowing users to add, remove, and manage items in their cart with a clean and responsive UI.",
    image: shoppingImg,
    alt: "Shopping cart preview",
    stack: ["React", "Tailwind", "Vite"],
  },
];

export default function Projects() {
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
      <SectionHeading overline="Selected work" title="Recent projects" />

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
                  alt={project.alt}
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
                    {project.summary}
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
                      Live
                      <IconArrowUpRight size={16} />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-9 rounded-lg px-4 text-sm font-semibold"
                  >
                    <a href={project.codeHref} target="_blank" rel="noreferrer">
                      Code
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
          overline="Extra builds"
          title="Smaller side projects"
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
                    alt={project.alt}
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
                      {project.summary}
                      <br />
                      {project.title === "AKAI for WOŚP" && (
                        <a
                          href="https://github.com/akai-org/wosp-puszki"
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          View AKAI for WOŚP repository
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
