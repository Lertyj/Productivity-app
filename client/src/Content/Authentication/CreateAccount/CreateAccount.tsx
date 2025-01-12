import React, { useState } from "react";
import style from "./CreateAccount.module.css";
import Input from "../Components/Input/Input";
import arrowback from "../../../svg/arrowback.svg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
function CreateAccount() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await registerUser(email, password);
    if (success) {
      navigate("/login");
    } else {
      setError("Incorrect email or password");
    }
  };
  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <NavLink to="../login">
          <button className={style.arrowback}>
            <img src={arrowback} />
            <p>Log in</p>
          </button>
        </NavLink>
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
            inputid1="email"
            inputid2="password"
            inputtext2="Your Password"
            buttontext1="Create an account"
            buttontype1="submit"
            label1="Your Email"
            label2="Your Password"
            classN="register"
            privacy="true"
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
