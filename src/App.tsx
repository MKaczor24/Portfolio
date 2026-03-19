import Header from "./components/Header";
import Footer from "./components/Footer";
import { Home, Projects, Stack, Contact } from "./pages/index.ts";

export function App() {
  return (
    <div>
      <Header />
      <div className="h-full w-full">
        <Home />
        <Projects />
        <Stack />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

export default App;
