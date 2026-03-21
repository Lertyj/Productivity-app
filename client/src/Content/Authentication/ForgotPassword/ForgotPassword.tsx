import React, { useState, useEffect } from "react";
import style from "./ForgotPassword.module.css";
import man from "../../../img/man.png";
import focus from "../../../img/focus.png";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import AuthForm from "../Components/Input/AuthForm";
import TextField from "../Components/Input/TextField";
import Button from "../Components/Button/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { resetPasswordUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== reEnterPassword) {
      setError("Passwords do not match");
      return;
    }

    const result = await resetPasswordUser(email, newPassword, reEnterPassword);
    if (result.success) {
      setMessage("Password successfully changed!");
      // Перенаправляем на логин через пару секунд, чтобы пользователь увидел сообщение
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError(result.message || "Error resetting password");
    }
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

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
          <p>Reset your account password</p>
        </div>
        <div className={style.input_block}>
          <AuthForm
            onSubmit={handleSubmit}
            error={error}
            submitText="Submit"
            secondaryButton={
              <NavLink to="/login" className={style.navlink}>
                <Button text="Back to Login" type="button" />
              </NavLink>
            }
          >
            {message && (
              <p
                style={{
                  color: "var(--green)",
                  textAlign: "center",
                  marginBottom: "1em",
                }}
              >
                {message}
              </p>
            )}
            <TextField
              type="email"
              id="reset-email"
              placeholder="Enter your email"
              value={email}
              onChange={setEmail}
            />
            <TextField
              type="password"
              id="reset-password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={setNewPassword}
            />
            <TextField
              type="password"
              id="reset-repassword"
              placeholder="Re-enter new password"
              value={reEnterPassword}
              onChange={setReEnterPassword}
            />
          </AuthForm>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
