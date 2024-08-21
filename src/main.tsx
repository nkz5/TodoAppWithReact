import React from "react";
import ReactDOM from "react-dom/client";
// import { createRoot } from "react-dom/client";
import { App } from "./App";
import { registerSW } from "virtual:pwa-register";

// const root = createRoot(document.getElementById("root") as Element);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

registerSW();
