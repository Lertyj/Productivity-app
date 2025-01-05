import React from "react";
import style from "./ForgotPassword.module.css";
import Input from "../Components/Input/Input";
import man from "../../../img/man.png";
import focus from "../../../img/focus.png";

function ForgotPassword() {
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
          <p>Please log into your existing accont</p>
        </div>
        <div className={style.input_block}>
          <Input
            inputtype1="password"
            inputtext1="Enter new password"
            inputtype2="password"
            inputtext2="Re-enter new password"
            buttontext1="Submit"
            buttontype1="submit"
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
