import { useEffect, useState } from "react";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const DEFAULT_HASH = "#home";

const anchors = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Stack", href: "#stack" },
  { name: "Contact", href: "#contact" },
];

const sectionIds = anchors.map((anchor) => anchor.href.replace("#", ""));

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
    () => window.location.hash || DEFAULT_HASH,
  );

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
    if (!isSidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isSidebarOpen]);

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

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("load", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("load", onScrollOrResize);
    };
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
        onClick={closeSidebar}
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
            onClick={closeSidebar}
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
              <a href={anchor.href} onClick={closeSidebar}>
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
