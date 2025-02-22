import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "../Content/Authentication/Start/Start";
import Login from "../Content/Authentication/Login/Login";
import ForgotPassword from "../Content/Authentication/ForgotPassword/ForgotPassword";
import Registration from "../Content/Authentication/Registration/Registration";
import CreateAccount from "../Content/Authentication/CreateAccount/CreateAccount";
import Home from "../Content/Home/Home";
import { useAuth } from "../Context/AuthContext";

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Start />} />
      <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
      <Route
        path="/forgotpassword"
        element={isAuthenticated ? <Home /> : <ForgotPassword />}
      />
      <Route
        path="/registration"
        element={isAuthenticated ? <Home /> : <Registration />}
      />
      {/* <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/registration" element={<Registration />} /> */}
      <Route
        path="/createaccount"
        element={isAuthenticated ? <Home /> : <CreateAccount />}
      />
    </Routes>
  );
}

export default AppRoutes;
