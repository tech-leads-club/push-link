import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Popup } from "./extension/popup/index";
import "./extension/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-stone-900 w-[500px] h-[700px]">
      <Popup />
    </div>
  </StrictMode>
);