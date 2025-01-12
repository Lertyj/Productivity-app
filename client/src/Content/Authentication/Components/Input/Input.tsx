import React from "react";
import style from "./Input.module.css";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";

interface InputProps {
  inputtype1: string;
  inputtype2: string;
  inputtype3?: string;
  buttontype1: "button" | "submit" | "reset";
  buttontype2?: "button" | "submit" | "reset";
  inputtext1: string;
  inputtext2: string;
  inputtext3?: string;
  buttontext1: string;
  buttontext2?: string;
  forgotpassword?: string;
  label1?: string;
  label2?: string;
  label3?: string;
  classN?: string;
  privacy?: string;
  navpath2?: string;
  inputid1: string;
  inputid2: string;
  inputid3?: string;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  newPassword?: string;
  setNewPassword?: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit?: (e: React.FormEvent) => void;
  error?: string;
}

function Input({
  inputtype1,
  inputtype2,
  inputtype3,
  buttontype1,
  buttontype2,
  inputtext1,
  inputtext2,
  inputtext3,
  buttontext1,
  buttontext2,
  forgotpassword,
  label1,
  label2,
  label3,
  classN,
  privacy,
  navpath2,
  inputid1,
  inputid2,
  inputid3,
  email,
  setEmail,
  password,
  setPassword,
  newPassword,
  setNewPassword,
  handleSubmit,
  error,
}: InputProps) {
  return (
    <form className={style.wrapper} onSubmit={handleSubmit}>
      <div className={style.block1}>
        {label1 && <label className={style.label}>{label1}</label>}
        <input
          className={style.textinput}
          type={inputtype1}
          id={inputid1}
          placeholder={inputtext1}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={style.block2}>
        {label2 && <label className={style.label}>{label2}</label>}
        <input
          className={style.textinput}
          type={inputtype2}
          id={inputid2}
          placeholder={inputtext2}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {inputtype3 && (
        <div className={style.block2}>
          {label3 && <label className={style.label}>{label3}</label>}
          <input
            className={style.textinput}
            type={inputtype3}
            id={inputid3}
            placeholder={inputtext3}
            value={newPassword}
            onChange={(e) => setNewPassword && setNewPassword(e.target.value)}
            required
          />
        </div>
      )}
      {error && <p className={style.error}>{error}</p>}
      {privacy && (
        <div className={style.privacy}>
          <button type="button" className={style.button}>
            <label className={style.label}>
              <input type="checkbox" className={style.real_checkbox} required />
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
            <NavLink to="/forgotpassword">
              <button type="button">Forgot Password</button>
            </NavLink>
          </div>
        )}
        <div className={style.buttons}>
          <Button text={buttontext1} type={buttontype1} classN={classN} />
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
