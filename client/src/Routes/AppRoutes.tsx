import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Start from "../Content/Authentication/Start/Start";
import Login from "../Content/Authentication/Login/Login";
import ForgotPassword from "../Content/Authentication/ForgotPassword/ForgotPassword";
import Registration from "../Content/Authentication/Registration/Registration";
import CreateAccount from "../Content/Authentication/CreateAccount/CreateAccount";
import Home from "../Content/Home/Home";
import { useAuth } from "../Context/AuthContext";
import Profile from "../Content/Profile/Profile";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Start />} />

      <Route
        path="/profile"
        element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
      />

      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
      />

      <Route
        path="/forgotpassword"
        element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/" />}
      />

      <Route
        path="/registration"
        element={!isAuthenticated ? <Registration /> : <Navigate to="/" />}
      />

      <Route
        path="/createaccount"
        element={!isAuthenticated ? <CreateAccount /> : <Navigate to="/" />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
