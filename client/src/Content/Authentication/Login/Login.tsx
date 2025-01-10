import React from "react";
import style from "./Login.module.css";
import man from "../../../img/man.png";
import focus from "../../../img/focus.png";
import Input from "../Components/Input/Input";

function Login() {
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
            inputtype1="email"
            inputtext1="Your Email"
            inputtype2="password"
            inputtext2="Your Password"
            buttontext1="Log in"
            navpath1="./home"
            navpath2="./registration"
            buttontype1="submit"
            buttontext2="Sign up"
            buttontype2="button"
            forgotpassword="Forgot Password"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
