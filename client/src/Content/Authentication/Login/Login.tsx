import React, { useState } from "react";
import style from "./Login.module.css";
import man from "../../../img/man.png";
import focus from "../../../img/focus.png";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import AuthForm from "../Components/Input/AuthForm";
import TextField from "../Components/Input/TextField";
import Button from "../Components/Button/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await loginUser(email, password);
    if (result.success) navigate("/");
    else setError(result.message || "Incorrect email or password");
  };

  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <h1>
          <span className={style.first}>F</span>ocus{" "}
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
          <AuthForm
            onSubmit={handleSubmit}
            error={error}
            submitText="Log in"
            secondaryButton={
              <NavLink to="/registration" className={style.navlink}>
                <Button text="Sign up" type="button" />
              </NavLink>
            }
          >
            <TextField
              type="email"
              id="login-email"
              placeholder="Your Email"
              value={email}
              onChange={setEmail}
            />
            <TextField
              type="password"
              id="login-password"
              placeholder="Your Password"
              value={password}
              onChange={setPassword}
            />
            <div className={style.forgot_password_link}>
              <NavLink to="/forgotpassword">
                <button type="button">Forgot Password?</button>
              </NavLink>
            </div>
          </AuthForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
