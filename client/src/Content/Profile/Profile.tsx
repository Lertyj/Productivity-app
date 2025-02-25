import React from "react";
import style from "./Profile.module.css";
import { useAuth } from "../../Context/AuthContext";
function Profile() {
  const { logout } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={style.wrapper}>
      <button className={style.button} onClick={logout}>
        Log out
      </button>
    </div>
  );
}

export default Profile;
