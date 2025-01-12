import React from "react";
import style from "./Registration.module.css";
import man from "../../../img/man.png";
import focus from "../../../img/focus.png";
import Button from "../Components/Button/Button";
import { NavLink } from "react-router-dom";

function Registration() {
  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <h1>
          <span className={style.first}>F</span>ocus
          <span className={style.second}>P</span>oint
        </h1>
      </div>
      <div className={style.information}>
        <img src={man} />
        <div className={style.text}>
          <h3>Stay</h3>
          <img src={focus} />
          <NavLink to="../login">
            <button className={style.loginlink}>
              Already have an account?
              <span className={style.login}>Log in</span>
            </button>
          </NavLink>
        </div>
        <div className={style.buttons}>
          <NavLink to="/createaccount">
            <Button text="Sign up with email" type="button" classN="register" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Registration;
