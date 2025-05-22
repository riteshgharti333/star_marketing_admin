import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./index.css";

import { ContextProvider } from "./Context/Context.jsx";
import { DarkModeProvider } from "./Context/DarkModeContext";

export const baseUrl = import.meta.env.VITE_BASE_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </ContextProvider>
  </StrictMode>
);
