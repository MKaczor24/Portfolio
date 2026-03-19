import { IconFileCv, IconFolderOpen } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main
      id="home"
      className="relative isolate min-h-screen overflow-hidden px-6 py-28 pb-12 md:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/src/assets/bg.webp')] bg-cover bg-center opacity-15" />
      <div className="from-background/0 to-background pointer-events-none absolute right-0 bottom-0 left-0 h-48 bg-linear-to-b" />

      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.25fr_0.9fr] lg:gap-16">
        <div className="animate-in fade-in slide-in-from-left-4 duration-750">
          <p className="text-primary text-shadow-secondary mb-3 text-sm tracking-[0.18em] uppercase text-shadow-md">
            fullstack developer
          </p>
          <h1 className="text-foreground text-shadow-secondary max-w-3xl text-4xl leading-tight font-semibold text-balance text-shadow-md sm:text-5xl xl:text-6xl">
            Building clean interfaces with a technical edge.
          </h1>
          <p className="text-muted-foreground text-shadow-secondary mt-6 max-w-2xl text-lg leading-relaxed text-shadow-md">
            I create performant, modern web experiences focused on readability,
            speed, and interaction quality. This portfolio is where I share my
            projects, stack, and the way I approach product work.
          </p>

          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Button
              asChild
              size="lg"
              className="shadow-background h-14 rounded-lg px-7 text-base font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <a>
                Get my resume
                <IconFileCv size={24} />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/35 bg-card/70 shadow-background hover:border-primary h-14 rounded-lg px-7 text-base font-semibold shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              <a href="#projects">
                Explore projects
                <IconFolderOpen size={24} />
              </a>
            </Button>
          </div>
        </div>

        <aside className="animate-in fade-in slide-in-from-right-4 duration-1000">
          <div className="border-border/60 from-card/85 to-card/45 shadow-background relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border bg-linear-to-br p-4 shadow-2xl backdrop-blur-md">
            <div className="bg-primary/20 pointer-events-none absolute top-10 left-10 h-28 w-28 rounded-full blur-2xl" />
            <img
              src="https://placehold.co/900x1100"
              alt="Profile preview"
              className="h-105 w-full rounded-xl object-cover md:h-130"
            />
          </div>
        </aside>
      </section>
    </main>
  );
}
