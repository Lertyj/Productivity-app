import React from "react";
import style from "./CreateAccount.module.css";
import Input from "../Components/Input/Input";
import arrowback from "../../../svg/arrowback.svg";
function CreateAccount() {
  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <a>
          <button className={style.arrowback}>
            <img src={arrowback} />
            <p>Log in</p>
          </button>
        </a>
      </div>
      <div className={style.information}>
        <div className={style.text}>
          <h2>Create account using Email</h2>
        </div>
        <div className={style.input_block}>
          <Input
            inputtype1="email"
            inputtext1="Your Email"
            inputtype2="password"
            inputtext2="Your Password"
            buttontext1="Create an account"
            buttontype1="submit"
            label1="Your Email"
            label2="Your Password"
            classN="register"
            privacy="true"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;