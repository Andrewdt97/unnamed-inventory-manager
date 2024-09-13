import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Quotes } from "./APIDisplay";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <Quotes />
  </React.StrictMode>
);
