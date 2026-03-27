import { useMemo, useState } from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
  SiPrisma,
  SiPostgresql,
  SiPostman,
  SiFigma,
} from "@icons-pack/react-simple-icons";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Section } from "@/components/section/Section";
import { SectionHeading } from "@/components/section/SectionHeading";
import { fadeUp, revealViewport, stagger } from "@/lib/motion";

const stackCategories = [
  {
    name: "Frontend",
    labelKey: "stack.filter.frontend",
    technologies: [
      { name: "HTML", icon: <SiHtml5 size={40} color="#E34F26" /> },
      { name: "CSS", icon: <SiCss size={40} color="#1572B6" /> },
      { name: "JavaScript", icon: <SiJavascript size={40} color="#F7DF1E" /> },
      { name: "TypeScript", icon: <SiTypescript size={40} color="#3178C6" /> },
      { name: "React", icon: <SiReact size={40} color="#61DAFB" /> },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss size={40} color="#06B6D4" />,
      },
      { name: "Next.js", icon: <SiNextdotjs size={40} color="#FAFAFA" /> },
    ],
  },
  {
    name: "Backend & Data",
    labelKey: "stack.filter.backendData",
    technologies: [
      { name: "MongoDB", icon: <SiMongodb size={40} color="#47A248" /> },
      { name: "Prisma", icon: <SiPrisma size={40} color="#FAFAFA" /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={40} color="#336791" /> },
    ],
  },
  {
    name: "Tools & Utilities",
    labelKey: "stack.filter.tools",
    technologies: [
      { name: "Postman", icon: <SiPostman size={40} color="#FF6C37" /> },
      { name: "Figma", icon: <SiFigma size={40} color="#F2F2F2" /> },
    ],
  },
];

export default function Stack() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const revealState = shouldReduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: revealViewport,
      };

  const [enabledCategories, setEnabledCategories] = useState<
    Record<string, boolean>
  >({
    Frontend: true,
    "Backend & Data": true,
    "Tools & Utilities": true,
  });

  const toggleCategory = (name: string, checked: boolean | "indeterminate") => {
    setEnabledCategories((prev) => ({
      ...prev,
      [name]: checked === true,
    }));
  };

  const selectAll = () => {
    setEnabledCategories({
      Frontend: true,
      "Backend & Data": true,
      "Tools & Utilities": true,
    });
  };

  const clearAll = () => {
    setEnabledCategories({
      Frontend: false,
      "Backend & Data": false,
      "Tools & Utilities": false,
    });
  };

  const filteredStack = useMemo(() => {
    return stackCategories
      .filter((category) => enabledCategories[category.name])
      .flatMap((category) =>
        category.technologies.map((technology) => ({
          ...technology,
          categoryLabelKey: category.labelKey,
        })),
      );
  }, [enabledCategories]);

  const enabledCategoriesKey = useMemo(
    () =>
      stackCategories
        .map(
          (category) =>
            `${category.name}:${enabledCategories[category.name] ? "1" : "0"}`,
        )
        .join("|"),
    [enabledCategories],
  );

  const getHoverTransform = (index: number) => {
    return index % 2 === 0
      ? "hover:[transform:rotateY(10deg)_rotateX(-5deg)_translateY(-5px)]"
      : "hover:[transform:rotateY(-10deg)_rotateX(5deg)_translateY(-5px)]";
  };

  return (
    <Section id="stack">
      <SectionHeading overline={t("stack.overline")} title={t("stack.title")} />

      <motion.div variants={fadeUp(0.06)} {...revealState}>
        <Card className="border-border/60 bg-card/40 shadow-background mb-8 rounded-2xl border py-5 shadow-md">
          <CardHeader className="px-5">
            <CardTitle className="text-base">
              {t("stack.filter.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5">
            <div className="flex flex-wrap items-center gap-4">
              {stackCategories.map((category) => (
                <label
                  key={category.name}
                  htmlFor={`filter-${category.name}`}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    id={`filter-${category.name}`}
                    checked={enabledCategories[category.name]}
                    onCheckedChange={(checked) =>
                      toggleCategory(category.name, checked)
                    }
                    className="rounded-sm"
                  />
                  <span className="text-sm">{t(category.labelKey)}</span>
                </label>
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={selectAll}
                className="rounded-lg"
              >
                {t("stack.filter.selectAll")}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={clearAll}
                className="rounded-lg"
              >
                {t("stack.filter.clearAll")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        key={enabledCategoriesKey}
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        variants={stagger(0.1, 0.06)}
        {...revealState}
      >
        {filteredStack.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center">
            {t("stack.empty")}
          </p>
        )}
        {filteredStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            className="perspective-distant"
            variants={fadeUp(0)}
          >
            <Card
              className={`border-border/60 bg-card/35 shadow-background hover:border-primary/50 transform-gpu rounded-2xl border py-4 shadow-md transition-transform duration-300 will-change-transform ${getHoverTransform(index)}`}
            >
              <CardContent className="flex flex-col items-start gap-4 px-4">
                <div className="flex w-full flex-row items-center justify-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center">
                    {tech.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold md:text-base">
                      {tech.name}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="mt-2 rounded-full text-[10px] sm:text-xs"
                >
                  {t(tech.categoryLabelKey)}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
