import React from "react";
import style from "./Start.module.css";
import Button from "../Components/Button/Button";
import start_women from "../../../img/start_women.png";
import { NavLink } from "react-router-dom";
function Start() {
  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <h1>
          <span className={style.first}>F</span>ocus
          <span className={style.second}>P</span>oint
        </h1>
      </div>
      <div className={style.information}>
        <img src={start_women} />
        <div className={style.text}>
          <h2>Task Management & To-Do List</h2>
          <p>
            This productivity tool is designed to help you better manage your
            task project-wise conveniently!
          </p>
        </div>
        <div className={style.button}>
          <NavLink to="/login">
            <Button text="Let’s start" type="button" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Start;
