import { useEffect, useState } from "react";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

const DEFAULT_HASH = "#home";

const anchors = [
  { key: "home", href: "#home" },
  { key: "projects", href: "#projects" },
  { key: "stack", href: "#stack" },
  { key: "contact", href: "#contact" },
];

const sectionIds = anchors.map((anchor) => anchor.href.replace("#", ""));

const socialMedia = [
  {
    key: "github",
    href: "https://github.com/MKaczor24",
    icon: <IconBrandGithub size={20} />,
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/micha%C5%82-kaczor-8616863a4/",
    icon: <IconBrandLinkedin size={20} />,
  },
  {
    key: "instagram",
    href: "https://instagram.com",
    icon: <IconBrandInstagram size={20} />,
  },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hash, setHash] = useState<string>(
    () => window.location.hash || DEFAULT_HASH,
  );

  const language = i18n.resolvedLanguage === "pl" ? "pl" : "en";
  const setLanguage = (nextLanguage: "en" | "pl") => {
    if (language !== nextLanguage) {
      void i18n.changeLanguage(nextLanguage);
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash || DEFAULT_HASH);
      closeSidebar();
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 10);
    };

    updateScrolled();
    document.addEventListener("scroll", updateScrolled, {
      passive: true,
      capture: true,
    });

    return () => {
      document.removeEventListener("scroll", updateScrolled, true);
    };
  }, []);

  useEffect(() => {
    const activationOffset = 140;
    let ticking = false;

    const setActiveHash = (id: string) => {
      const nextHash = `#${id}`;
      setHash((prevHash) => (prevHash === nextHash ? prevHash : nextHash));

      if (window.location.hash !== nextHash) {
        history.replaceState(null, "", nextHash);
      }
    };

    const getSections = () =>
      sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);

    const updateActiveSection = () => {
      const sections = getSections();
      if (!sections.length) return;

      let activeId = sections[0].id;
      for (const section of sections) {
        const top = section.getBoundingClientRect().top;
        if (top - activationOffset <= 0) {
          activeId = section.id;
        } else {
          break;
        }
      }

      setActiveHash(activeId);
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    updateActiveSection();

    document.addEventListener("scroll", onScrollOrResize, {
      passive: true,
      capture: true,
    });

    return () => {
      document.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, []);

  const isActive = (href: string) => hash === href;

  return (
    <header className="animate-in slide-in-from-top-10 fixed top-0 z-50 w-full px-4 pt-4 duration-750">
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-xl transition-all duration-300 md:px-6 ${
          isScrolled
            ? "border-border/80 bg-background/78 shadow-xl"
            : "border-border/60 bg-background/60 shadow-background"
        }`}
      >
        <a href="#home" className="group flex items-baseline gap-2">
          <span className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
            MKaczor
          </span>
        </a>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Main">
          {anchors.map((anchor) => {
            return (
              <Button
                key={anchor.key}
                asChild
                variant={isActive(anchor.href) ? "secondary" : "ghost"}
                className="h-9 rounded-lg px-3 text-sm"
              >
                <a href={anchor.href}>{t(`nav.${anchor.key}`)}</a>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <div
            className="border-primary/60 bg-background/70 hidden items-center overflow-hidden rounded-lg border md:inline-flex"
            aria-label={t("lang.label")}
          >
            <Button
              type="button"
              variant={language === "en" ? "secondary" : "ghost"}
              className="h-9 rounded-none border-r px-2.5 text-xs"
              aria-label={t("lang.switchToEnglish")}
              onClick={() => setLanguage("en")}
            >
              {t("lang.en")}
            </Button>
            <Button
              type="button"
              variant={language === "pl" ? "secondary" : "ghost"}
              className="h-9 rounded-none px-2.5 text-xs"
              aria-label={t("lang.switchToPolish")}
              onClick={() => setLanguage("pl")}
            >
              {t("lang.pl")}
            </Button>
          </div>

          {socialMedia.map((social) => {
            return (
              <Button
                key={social.key}
                asChild
                variant="ghost"
                size="icon"
                className="rounded-lg"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t(`social.${social.key}`)}
                >
                  {social.icon}
                </a>
              </Button>
            );
          })}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t("nav.openNavigation")}
            className="rounded-lg md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <IconMenu2 size={20} />
          </Button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${isSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden="true"
        onClick={closeSidebar}
      />

      <aside
        className={`border-border/60 bg-background/95 shadow-background fixed top-0 right-0 z-50 flex h-dvh w-[85vw] max-w-sm flex-col border-l p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 md:hidden ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Mobile navigation"
        aria-hidden={!isSidebarOpen}
        inert={!isSidebarOpen}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="text-foreground text-lg font-semibold">
            {t("nav.menu")}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-lg"
            aria-label={t("nav.closeNavigation")}
            onClick={closeSidebar}
          >
            <IconX size={20} />
          </Button>
        </div>

        <div className="flex w-full items-center justify-center">
          <div
            className="border-primary/60 bg-background/70 mb-4 inline-flex items-center overflow-hidden rounded-lg border"
            aria-label={t("lang.label")}
          >
            <Button
              type="button"
              variant={language === "en" ? "secondary" : "ghost"}
              className="h-10 rounded-none border-r px-3 text-xs"
              aria-label={t("lang.switchToEnglish")}
              onClick={() => setLanguage("en")}
            >
              {t("lang.en")}
            </Button>
            <Button
              type="button"
              variant={language === "pl" ? "secondary" : "ghost"}
              className="h-10 rounded-none px-3 text-xs"
              aria-label={t("lang.switchToPolish")}
              onClick={() => setLanguage("pl")}
            >
              {t("lang.pl")}
            </Button>
          </div>
        </div>

        <nav className="flex flex-col gap-2" aria-label="Mobile main">
          {anchors.map((anchor) => (
            <Button
              key={anchor.key}
              asChild
              variant={isActive(anchor.href) ? "secondary" : "ghost"}
              className="h-11 justify-start rounded-lg px-3 text-sm"
            >
              <a href={anchor.href} onClick={closeSidebar}>
                {t(`nav.${anchor.key}`)}
              </a>
            </Button>
          ))}
        </nav>

        <div className="mt-auto flex w-full items-center justify-center gap-8">
          {socialMedia.map((social) => (
            <Button
              key={social.key}
              asChild
              variant="outline"
              size="icon"
              className="rounded-lg"
            >
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={t(`social.${social.key}`)}
              >
                {social.icon}
              </a>
            </Button>
          ))}
        </div>
      </aside>
    </header>
  );
}
