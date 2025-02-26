import React from "react";
import style from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../Routes/AppRoutes";
import Header from "../Content/Home/Components/Header/Header";
import Navbar from "../Content/Navigation/Navbar";
import { useAuth } from "../Context/AuthContext";
import ScrollToTop from "./Methods/ScrollToTop";
function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div className={isAuthenticated ? style.wrapper : style.noauthwrapper}>
      <Router>
        <ScrollToTop />
        {isAuthenticated && <Header name="Eugene Khudik" amount="5" />}
        {isAuthenticated && <Navbar />}
        <div className={style.content}>
          <AppRoutes />
        </div>
      </Router>
    </div>
  );
}

export default App;
