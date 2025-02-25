import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext";
function RootComponent() {
  return (
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  );
}

const appContainer = document.createElement("div");
document.body.appendChild(appContainer);
const root = ReactDOM.createRoot(appContainer);
root.render(<RootComponent />);
