import Header from "./components/Header";
import Home from "./pages/Home/page";

export function App() {
  return (
    <div>
      <div className="absolute top-0 z-10 w-full">
        <Header />
      </div>
      <div className="h-full w-full">
        <Home />
      </div>
    </div>
  );
}

export default App;
