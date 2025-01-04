import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import "./index.css";
function RootComponent() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

const appContainer = document.createElement("div");
document.body.appendChild(appContainer);
const root = ReactDOM.createRoot(appContainer);
root.render(<RootComponent />);
