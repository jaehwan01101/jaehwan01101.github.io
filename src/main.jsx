import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/jetbrains-mono";
import { App } from "./App.jsx";
import "./styles.css";

async function renderApp() {
  if (document.fonts) {
    const fontsReady = Promise.all([
      document.fonts.load('400 1em "Hanken Grotesk Variable"', "Portfolio"),
      document.fonts.load('400 1em "JetBrains Mono Variable"', "portfolio.log"),
      document.fonts.load('400 1em "Pretendard Variable"', "김재환"),
    ]);
    const timeout = new Promise((resolve) => window.setTimeout(resolve, 3000));

    await Promise.race([fontsReady, timeout]);
  }

  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

renderApp();
