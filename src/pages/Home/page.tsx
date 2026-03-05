import { IconFileCv, IconFolderOpen } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="relative h-screen w-screen items-center justify-center bg-transparent">
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-[url('/src/assets/bg.webp')] bg-cover bg-fixed bg-center opacity-15"></div>
      <div className="text-foreground text-shadow-secondary z-10 container mx-auto flex h-full items-center justify-center text-shadow-sm">
        <div className="flex h-3/4 w-5/6 flex-col items-start justify-evenly gap-6 text-left">
          <h1 className="text-6xl font-bold">Template header</h1>
          <h2 className="text-primary text-4xl font-semibold">
            Overall description example text a bit more of it, example text,
            Patryk Czupak cwelem jest
          </h2>
          <p className="text-primary-foreground text-2xl">
            Example description witch to the improved way to explore your data,
            with natural language. Monitoring will no longer be available on the
            Pro plan in November, 2025
          </p>
          <div className="z-20 flex w-full flex-row items-center justify-around gap-10">
            <button className="bg-primary text-foreground hover:bg-sidebar-primary shadow-secondary hover:shadow-background flex h-16 w-1/6 items-center gap-2 px-4 py-2 shadow-lg transition-colors duration-300">
              Get my resume!
              <IconFileCv size={24} />
            </button>
            <button className="bg-primary text-foreground hover:bg-sidebar-primary shadow-secondary hover:shadow-background flex h-16 w-1/6 items-center gap-2 px-4 py-2 shadow-lg transition-colors duration-300">
              Explore my projects!
              <IconFolderOpen size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
