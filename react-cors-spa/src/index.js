import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ReactQueryDevTools } from "@tanstack/react-query-devtools";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
