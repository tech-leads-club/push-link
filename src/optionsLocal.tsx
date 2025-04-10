import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Options from "./extension/options/index";
import "./extension/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-stone-900 w-full h-[1000px]">
      <Options />
    </div>
  </StrictMode>
);