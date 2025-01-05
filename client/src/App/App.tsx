import React from "react";
import style from "./App.module.css";
import Start from "../Content/Authentication/Start/Start";
import Login from "../Content/Authentication/Login/Login";
import ForgotPassword from "../Content/Authentication/ForgotPassword/ForgotPassword";
function App() {
  return (
    <div className={style.wrapper}>
      <ForgotPassword />
    </div>
  );
}

export default App;
