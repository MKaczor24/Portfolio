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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Section } from "@/components/section/Section";
import { SectionHeading } from "@/components/section/SectionHeading";

const stackCategories = [
  {
    name: "Frontend",
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
    technologies: [
      { name: "MongoDB", icon: <SiMongodb size={40} color="#47A248" /> },
      { name: "Prisma", icon: <SiPrisma size={40} color="#FAFAFA" /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={40} color="#336791" /> },
    ],
  },
  {
    name: "Tools & Utilities",
    technologies: [
      { name: "Postman", icon: <SiPostman size={40} color="#FF6C37" /> },
      { name: "Figma", icon: <SiFigma size={40} color="#F2F2F2" /> },
    ],
  },
];

export default function Stack() {
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
          category: category.name,
        })),
      );
  }, [enabledCategories]);

  const getHoverTransform = (index: number) => {
    return index % 2 === 0
      ? "hover:[transform:rotateY(10deg)_rotateX(-5deg)_translateY(-5px)]"
      : "hover:[transform:rotateY(-10deg)_rotateX(5deg)_translateY(-5px)]";
  };

  return (
    <Section id="stack">
      <SectionHeading overline="Tech stack" title="Technologies I work with" />

      <Card className="section-reveal border-border/60 bg-card/40 shadow-background mb-8 rounded-2xl border py-5 shadow-md [animation-delay:80ms]">
        <CardHeader className="px-5">
          <CardTitle className="text-base">Filter categories</CardTitle>
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
                <span className="text-sm">{category.name}</span>
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
              Select all
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={clearAll}
              className="rounded-lg"
            >
              Clear all
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="section-reveal grid grid-cols-2 gap-4 [animation-delay:160ms] lg:grid-cols-4">
        {filteredStack.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center">
            No technologies match the selected categories.
          </p>
        )}
        {filteredStack.map((tech, index) => (
          <div key={tech.name} className="perspective-distant">
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
                <Badge variant="outline" className="mt-2 rounded-full">
                  {tech.category}
                </Badge>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}
