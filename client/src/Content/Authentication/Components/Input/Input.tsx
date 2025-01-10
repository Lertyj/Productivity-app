import React from "react";
import style from "./Input.module.css";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";

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
  label1?: string;
  label2?: string;
  classN?: string;
  privacy?: string;
  navpath1?: string;
  navpath2?: string;
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
  label1,
  label2,
  classN,
  privacy,
  navpath1,
  navpath2,
}: InputProps) {
  return (
    <form className={style.wrapper}>
      <div className={style.block1}>
        {label1 && <label className={style.label}>{label1}</label>}
        <input
          className={style.textinput}
          type={inputtype1}
          id={inputtype1}
          placeholder={inputtext1}
          required
        />
      </div>
      <div className={style.block2}>
        {label2 && <label className={style.label}>{label2}</label>}
        <input
          className={style.textinput}
          type={inputtype2}
          id={inputtype2}
          placeholder={inputtext2}
          required
        />
      </div>
      {privacy && (
        <div className={style.privacy}>
          <button type="button" className={style.button}>
            <label className={style.label}>
              <input type="checkbox" className={style.real_checkbox} />
              <span className={style.custom_checkbox}></span>
            </label>
          </button>
          <p>
            I agree to{" "}
            <span className={style.privacyspan}>Terms and Condition</span> and{" "}
            <span className={style.privacyspan}>Privacy Policy</span>
          </p>
        </div>
      )}
      <div className={style.block}>
        {forgotpassword && (
          <div className={style.forgot_password}>
            <NavLink to="./forgotpassword">
              <button type="button">Forgot Password</button>
            </NavLink>
          </div>
        )}
        <div className={style.buttons}>
          <NavLink to={navpath1 || ""}>
            <Button text={buttontext1} type={buttontype1} classN={classN} />
          </NavLink>

          {buttontext2 && (
            <NavLink to={navpath2 || ""}>
              <Button text={buttontext2} type={buttontype2 || "button"} />
            </NavLink>
          )}
        </div>
      </div>
    </form>
  );
}

export default Input;
