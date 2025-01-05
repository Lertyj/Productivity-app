import React from "react";
import style from "./App.module.css";
import Start from "../Content/Authentication/Start/Start";
import Login from "../Content/Authentication/Login/Login";
function App() {
  return (
    <div className={style.wrapper}>
      <Login />
    </div>
  );
}

export default App;
