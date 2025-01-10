import React from "react";
import style from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "../Content/Authentication/Start/Start";
import Login from "../Content/Authentication/Login/Login";
import ForgotPassword from "../Content/Authentication/ForgotPassword/ForgotPassword";
import Registration from "../Content/Authentication/Registration/Registration";
import CreateAccount from "../Content/Authentication/CreateAccount/CreateAccount";
import Home from "../Content/Home/Home";
function App() {
  return (
    <div className={style.wrapper}>
      <Router>
        <div className={style.content}>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/home" element={<Home />} />
            <Route path="/login/forgotpassword" element={<ForgotPassword />} />
            <Route path="/login/registration" element={<Registration />} />
            {/* <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/registration" element={<Registration />} /> */}
            <Route
              path="/login/registration/createaccount"
              element={<CreateAccount />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
