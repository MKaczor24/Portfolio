import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/page";
import SectionFallback from "./components/section/SectionFallback";

const Projects = lazy(() => import("./pages/Projects/page"));
const Stack = lazy(() => import("./pages/Stack/page"));
const Contact = lazy(() => import("./pages/Contact/page"));

function SectionsFallback() {
  return (
    <>
      <SectionFallback />
      <SectionFallback />
      <SectionFallback />
    </>
  );
}

export function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <div className="h-full w-full">
        <Home />
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="from-primary/15 to-primary/10 absolute top-[8%] -left-50 h-280 w-280 bg-radial via-violet-300/5 blur-3xl max-md:opacity-55" />
            <div className="via-primary/10 absolute top-[28%] -left-50 h-80 w-80 bg-radial from-indigo-300/5 to-transparent blur-3xl max-md:opacity-55" />
            <div className="from-primary/15 absolute top-[50%] -right-50 h-200 w-200 bg-radial via-indigo-300/10 to-transparent blur-3xl max-md:opacity-55" />
            <div className="via-primary/6 absolute top-[70%] -right-25 h-100 w-100 bg-radial from-violet-300/10 to-transparent blur-3xl max-md:opacity-45" />
            <div className="from-primary/15 absolute top-[75%] -left-50 h-120 w-120 bg-radial via-indigo-300/6 to-transparent blur-3xl max-md:opacity-45" />
            <div className="via-primary/6 absolute top-[85%] -left-25 h-60 w-60 bg-radial from-violet-300/10 to-transparent blur-3xl max-md:opacity-45" />
          </div>

          <Suspense fallback={<SectionsFallback />}>
            <Projects />
            <Stack />
            <Contact />
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
