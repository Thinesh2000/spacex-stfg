import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// region: styles
import "./index.css";

// region: pages
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
