import { IconFileCv, IconFolderOpen } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section/Section";
import profilePreview from "@/assets/profile-hero.webp";
import bgImg from "@/assets/bg.webp";
import sampleCv from "@/assets/sampleCv.pdf";

export default function Home() {
  const { t } = useTranslation();

  return (
    <Section
      as="main"
      id="home"
      className="min-h-screen py-28 pb-12"
      containerClassName="max-w-6xl"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bgImg})` }}
      />
      <div className="from-background/0 to-background pointer-events-none absolute right-0 bottom-0 left-0 h-48 bg-linear-to-b" />

      <section className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="section-reveal w-full lg:flex-[1.25]">
          <p className="text-primary text-shadow-secondary mb-3 text-sm tracking-[0.18em] uppercase text-shadow-md">
            {t("home.role")}
          </p>
          <h1 className="text-foreground text-shadow-secondary max-w-3xl text-3xl leading-tight font-semibold text-balance text-shadow-md sm:text-5xl xl:text-6xl">
            {t("home.title")}
          </h1>
          <p className="text-muted-foreground/90 text-shadow-secondary mt-6 max-w-2xl text-lg leading-relaxed text-shadow-md">
            {t("home.description")}
          </p>

          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Button
              asChild
              size="lg"
              className="shadow-background h-14 rounded-lg px-7 text-base font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <a href={sampleCv} download>
                {t("home.ctaResume")}
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
                {t("home.ctaProjects")}
                <IconFolderOpen size={24} />
              </a>
            </Button>
          </div>
        </div>

        <aside className="section-reveal w-full [animation-delay:120ms] lg:flex-[0.9]">
          <div className="border-border/60 from-card/85 to-card/45 shadow-background relative mx-auto w-full max-w-md rounded-2xl border bg-linear-to-br p-4 shadow-md backdrop-blur-md">
            <div className="bg-primary/20 pointer-events-none absolute top-10 left-10 h-28 w-28 rounded-full blur-2xl" />
            <img
              src={profilePreview}
              alt={t("home.profileAlt")}
              width={900}
              height={1100}
              fetchPriority="high"
              decoding="async"
              className="h-105 w-full rounded-xl object-cover md:h-130"
            />
          </div>
        </aside>
      </section>
    </Section>
  );
}
