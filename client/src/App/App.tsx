import React from "react";
import style from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../Routes/AppRoutes";
import Header from "../Content/Home/Components/Header/Header";
import Navbar from "../Content/Navigation/Navbar";
import { useAuth } from "../Context/AuthContext";
import ScrollToTop from "./Methods/ScrollToTop";

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={style.loadingWrapper}>
        <div>Загрузка...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className={isAuthenticated ? style.wrapper : style.noauthwrapper}>
        <ScrollToTop />

        {isAuthenticated && (
          <>
            <Header name="Eugene Khudik" amount="5" />
            <Navbar />
          </>
        )}

        <div className={isAuthenticated ? style.content : style.fullContent}>
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
