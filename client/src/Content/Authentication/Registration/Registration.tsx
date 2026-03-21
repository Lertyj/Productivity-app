import React, { useState } from "react";
import style from "./Registration.module.css";
import man from "../../../img/man.png";
import focus from "../../../img/focus.png";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import AuthForm from "../Components/Input/AuthForm";
import TextField from "../Components/Input/TextField";
import Button from "../Components/Button/Button";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await registerUser(email, password);
    if (result.success) {
      navigate("/login");
    } else {
      setError(result.message || "Registration error");
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
          <NavLink to="/login">
            <button className={style.loginlink} type="button">
              Already have an account?{" "}
              <span className={style.login}>Log in</span>
            </button>
          </NavLink>
        </div>
        <div className={style.input_block}>
          <AuthForm
            onSubmit={handleSubmit}
            error={error}
            submitText="Sign up with email"
            showPrivacy={true} // Включаем чекбокс политики
          >
            <TextField
              type="email"
              id="reg-email"
              placeholder="Your email"
              value={email}
              onChange={setEmail}
            />
            <TextField
              type="password"
              id="reg-password"
              placeholder="Create password"
              value={password}
              onChange={setPassword}
            />
          </AuthForm>
        </div>
      </div>
    </div>
  );
};

export default Registration;
