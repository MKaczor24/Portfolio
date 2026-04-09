import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner";
import "./i18n";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Analytics />
    <Toaster
      position="top-center"
      gap={10}
      expand={false}
      offset={{ top: 40 }}
      mobileOffset={{ top: 40, left: 16, right: 16 }}
    />
  </StrictMode>,
);
