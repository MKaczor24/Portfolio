import {
  IconArrowUp,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { StripedPattern } from "./magicui/striped-pattern";

const quickLinks = [
  { key: "home", href: "#home" },
  { key: "projects", href: "#projects" },
  { key: "stack", href: "#stack" },
  { key: "contact", href: "#contact" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/MKaczor24",
    icon: <IconBrandGithub size={16} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/micha%C5%82-kaczor-8616863a4/",
    icon: <IconBrandLinkedin size={16} />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: <IconBrandInstagram size={16} />,
  },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative isolate overflow-hidden px-6 py-6 md:px-10 lg:px-16">
      <div className="border-border/50 bg-background/55 shadow-background relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border px-5 py-4 shadow-md backdrop-blur-md md:px-6 md:py-5">
        <StripedPattern
          direction="right"
          width={14}
          height={14}
          className="text-primary/20 absolute inset-0 mask-[radial-gradient(850px_circle_at_center,black,transparent)] opacity-70"
        />
        <div className="from-background/78 via-background/55 to-background/78 pointer-events-none absolute inset-0 bg-linear-to-r" />

        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-foreground text-xl font-semibold tracking-tight">
              MKaczor
            </p>
            <span className="text-primary text-xs tracking-[0.16em] uppercase">
              {t("footer.tag")}
            </span>
            <span className="text-muted-foreground text-xs">
              {t("footer.thanks")}
            </span>
          </div>

          <nav
            className="flex flex-wrap items-center gap-3 md:justify-center"
            aria-label={t("footer.navAria")}
          >
            {quickLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 md:ml-auto md:justify-end">
            {socials.map((social) => (
              <Button
                key={social.label}
                asChild
                variant="ghost"
                size="icon-sm"
                className="rounded-lg"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              </Button>
            ))}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="ml-2 rounded-lg px-3 text-xs"
            >
              <a href="#home">
                <>
                  <IconArrowUp size={14} />
                </>
                {t("footer.backToTop")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
