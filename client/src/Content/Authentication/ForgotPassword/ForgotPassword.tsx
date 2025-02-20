import React, { useState } from "react";
import style from "./ForgotPassword.module.css";
import Input from "../Components/Input/Input";
import man from "../../../img/man.png";
import focus from "../../../img/focus.png";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const { resetPasswordUser } = useAuth();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const success = await resetPasswordUser(
      email,
      newPassword,
      reEnterPassword
    );
    if (success) {
      setMessage("Пароль успешно изменен");
    } else {
      setMessage("Не удалось изменить пароль");
    }
  };
  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <h1>
          <span className={style.first}>F</span>ocus
          <span className={style.second}>P</span>oint
        </h1>
      </div>
      <div className={style.information}>
        <img src={man} alt="User" />
        <div className={style.text}>
          <h3>Stay</h3>
          <img src={focus} alt="Focus" />
          <p>Please log into your existing account</p>
        </div>
        <div className={style.input_block}>
          <Input
            inputtype1="email"
            inputtext1="Enter your email"
            inputtype2="password"
            inputtext2="Enter new password"
            inputtype3="password"
            inputtext3="Re-enter new password"
            buttontext2="Submit"
            buttontype2="submit"
            navpath2="/login"
            inputid1="email"
            inputid2="newPassword"
            inputid3="confirmPassword"
            email={email}
            setEmail={setEmail}
            password={newPassword}
            setNewPassword={setNewPassword}
            setReEnterPassword={setReEnterPassword}
            error={error}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
