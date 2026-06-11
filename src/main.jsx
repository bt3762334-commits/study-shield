import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./styles/globals.css";

// تهيئة الخدمات
import { themeService } from "./services/themeService";
import { soundService } from "./services/soundService";

// تهيئة المظهر
themeService.init();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log(
          "Service Worker registered:",
          registration
        );
      })
      .catch(error => {
        console.log(
          "Service Worker registration failed:",
          error
        );
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
