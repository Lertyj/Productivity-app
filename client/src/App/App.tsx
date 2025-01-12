import React from "react";
import style from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../Routes/AppRoutes";
import { AuthProvider } from "../Context/AuthContext";
function App() {
  return (
    <AuthProvider>
      <div className={style.wrapper}>
        <Router>
          <div className={style.content}>
            <AppRoutes />
          </div>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
