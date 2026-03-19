import { useEffect, useState } from "react";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const anchors = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Stack", href: "#stack" },
  { name: "Contact", href: "#contact" },
];

const socialMedia = [
  {
    name: "GitHub",
    href: "https://github.com/MKaczor24",
    icon: <IconBrandGithub size={20} />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/micha%C5%82-kaczor-8616863a4/",
    icon: <IconBrandLinkedin size={20} />,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: <IconBrandInstagram size={20} />,
  },
];

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hash, setHash] = useState<string>(
    () => window.location.hash || "#home",
  );

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash || "#home");
      setIsSidebarOpen(false);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const sectionIds = anchors.map((anchor) => anchor.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const setActiveHash = (id: string) => {
      const nextHash = `#${id}`;
      setHash((prevHash) => (prevHash === nextHash ? prevHash : nextHash));

      if (window.location.hash !== nextHash) {
        history.replaceState(null, "", nextHash);
      }
    };

    const intersectionById = new Map<string, number>();
    const getClosestSectionId = () => {
      const activationOffset = 120;
      const sorted = sections
        .map((section) => ({
          id: section.id,
          top: section.getBoundingClientRect().top,
        }))
        .sort(
          (a, b) =>
            Math.abs(a.top - activationOffset) -
            Math.abs(b.top - activationOffset),
        );

      return sorted[0]?.id;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersectionById.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        let activeSectionId: string | undefined;
        let maxRatio = 0;

        intersectionById.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            activeSectionId = id;
          }
        });

        if (!activeSectionId) {
          activeSectionId = getClosestSectionId();
        }

        if (activeSectionId) {
          setActiveHash(activeSectionId);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
      },
    );

    sections.forEach((section) => {
      intersectionById.set(section.id, 0);
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const isActive = (href: string) => hash === href;

  return (
    <header className="animate-in slide-in-from-top-10 fixed top-0 z-50 w-full px-4 pt-4 duration-750">
      <div className="border-border/60 bg-background/60 shadow-background mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-xl md:px-6">
        <a href="#home" className="group flex items-baseline gap-2">
          <span className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
            MKaczor
          </span>
        </a>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Main">
          {anchors.map((anchor) => {
            return (
              <Button
                key={anchor.name}
                asChild
                variant={isActive(anchor.href) ? "secondary" : "ghost"}
                className="h-9 rounded-lg px-3 text-sm"
              >
                <a href={anchor.href}>{anchor.name}</a>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          {socialMedia.map((social) => {
            return (
              <Button
                key={social.name}
                asChild
                variant="ghost"
                size="icon"
                className="rounded-lg"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
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
            aria-label="Open navigation"
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
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={`border-border/60 bg-background/95 shadow-background fixed top-0 right-0 z-50 flex h-dvh w-[85vw] max-w-sm flex-col border-l p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 md:hidden ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Mobile navigation"
        aria-hidden={!isSidebarOpen}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="text-foreground text-lg font-semibold">Menu</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-lg"
            aria-label="Close navigation"
            onClick={() => setIsSidebarOpen(false)}
          >
            <IconX size={20} />
          </Button>
        </div>

        <nav className="flex flex-col gap-2" aria-label="Mobile main">
          {anchors.map((anchor) => (
            <Button
              key={anchor.name}
              asChild
              variant={isActive(anchor.href) ? "secondary" : "ghost"}
              className="h-11 justify-start rounded-lg px-3 text-sm"
            >
              <a href={anchor.href} onClick={() => setIsSidebarOpen(false)}>
                {anchor.name}
              </a>
            </Button>
          ))}
        </nav>

        <div className="mt-auto flex w-full items-center justify-center gap-8">
          {socialMedia.map((social) => (
            <Button
              key={social.name}
              asChild
              variant="outline"
              size="icon"
              className="rounded-lg"
            >
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
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
