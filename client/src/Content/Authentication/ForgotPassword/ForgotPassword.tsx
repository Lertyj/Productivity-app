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
  const [error, setError] = useState("");
  const { resetPasswordUser } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const success = await resetPasswordUser(email, oldPassword, newPassword);
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
            inputtext2="Enter old password"
            inputtype3="password"
            inputtext3="Enter new password"
            buttontext1="Submit"
            buttontype1="submit"
            inputid1="email"
            inputid2="oldPassword"
            inputid3="newPassword"
            email={email}
            setEmail={setEmail}
            password={oldPassword}
            setPassword={setOldPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            handleSubmit={handleSubmit}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
