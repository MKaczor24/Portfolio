import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
} from "@tabler/icons-react";

const anchors = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialMedia = [
  {
    name: "GitHub",
    href: "https://github.com/MKaczor24",
    icon: <IconBrandGithub size={32} className="drop-shadow-secondary" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/micha%C5%82-kaczor-8616863a4/",
    icon: <IconBrandLinkedin size={32} className="drop-shadow-secondary" />,
  },
  {
    name: "Instagram",
    href: "intagram.com",
    icon: <IconBrandInstagram size={32} className="drop-shadow-secondary" />,
  },
];

export default function Header() {
  return (
    <div className="from-primary to-sidebar-primary shadow-secondary text-foreground text-shadow-secondary flex w-full items-center justify-between bg-gradient-to-r px-4 py-6 shadow-lg text-shadow-sm">
      <h1 className="text-4xl font-semibold">MKaczor</h1>
      <div className="flex items-center justify-around">
        {anchors.map((anchor) => {
          return (
            <a
              key={anchor.name}
              href={anchor.href}
              className="hover:text-secondary mx-4 text-2xl transition-colors duration-300"
            >
              {anchor.name}
            </a>
          );
        })}
      </div>
      <div className="flex items-center justify-around">
        {socialMedia.map((socialMedia) => {
          return (
            <a
              key={socialMedia.name}
              href={socialMedia.href}
              className="hover:text-secondary mx-4 transition-colors duration-300"
            >
              {socialMedia.icon}
            </a>
          );
        })}
      </div>
    </div>
  );
}
