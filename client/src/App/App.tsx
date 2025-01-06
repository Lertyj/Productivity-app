import React from "react";
import style from "./App.module.css";
import Start from "../Content/Authentication/Start/Start";
import Login from "../Content/Authentication/Login/Login";
import ForgotPassword from "../Content/Authentication/ForgotPassword/ForgotPassword";
import Registration from "../Content/Authentication/Registration/Registration";
function App() {
  return (
    <div className={style.wrapper}>
      <Registration />
    </div>
  );
}

export default App;
