import React from "react";
import style from "./Input.module.css";
import Button from "../Button/Button";

interface InputProps {
  inputtype1: string;
  inputtype2: string;
  buttontype1: "button" | "submit" | "reset";
  buttontype2?: "button" | "submit" | "reset";
  inputtext1: string;
  inputtext2: string;
  buttontext1: string;
  buttontext2?: string;
  forgotpassword?: string;
}
function Input({
  inputtype1,
  inputtype2,
  buttontype1,
  buttontype2,
  inputtext1,
  inputtext2,
  buttontext1,
  buttontext2,
  forgotpassword,
}: InputProps) {
  return (
    <form className={style.wrapper}>
      <input
        type={inputtype1}
        id={inputtype1}
        placeholder={inputtext1}
        required
      />

      <input
        type={inputtype2}
        id={inputtype2}
        placeholder={inputtext2}
        required
      />
      <div className={style.block}>
        {forgotpassword && (
          <div className={style.forgot_password}>
            <p>Forgot Password</p>
          </div>
        )}
        <div className={style.buttons}>
          <Button text={buttontext1} type={buttontype1} />
          {buttontext2 && (
            <Button text={buttontext2} type={buttontype2 || "button"} />
          )}
        </div>
      </div>
    </form>
  );
}

export default Input;
