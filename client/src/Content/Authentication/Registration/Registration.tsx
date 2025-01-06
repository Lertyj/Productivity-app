import React from "react";
import style from "./Registration.module.css";
import man from "../../../img/man.png";
import focus from "../../../img/focus.png";
import Input from "../Components/Input/Input";
import Button from "../Components/Button/Button";

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
          <p>
            Already have an account? <span className={style.login}>Log in</span>
          </p>
        </div>
        <div className={style.buttons}>
          <Button text="Sign up with email" type="button" classN="register" />
        </div>
      </div>
    </div>
  );
}

export default Registration;
