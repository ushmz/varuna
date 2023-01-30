import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";
import "./i18n/configs";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
