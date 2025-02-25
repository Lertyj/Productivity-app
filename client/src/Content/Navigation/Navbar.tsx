import React from "react";
import style from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { ReactComponent as Pomodoro } from "../../svg/pomodoro.svg";
import { ReactComponent as Profile } from "../../svg/profile.svg";
import { ReactComponent as Dashboard } from "../../svg/dashboard.svg";
import { ReactComponent as Calendar } from "../../svg/calendar.svg";
import { ReactComponent as Addtask } from "../../svg/addtask.svg";
function Navbar() {
  return (
    <div className={style.wrapper}>
      <nav className={style.nav}>
        <div className={style.container}>
          <NavLink to="/">
            <button className={style.button}>
              <Dashboard className={style.item} />
            </button>
          </NavLink>
          <NavLink to="/">
            <button className={style.button}>
              <Calendar className={style.item} />
            </button>
          </NavLink>
          <NavLink to="/">
            <button className={style.button}>
              <Addtask className={style.item} />
            </button>
          </NavLink>
          <NavLink to="/">
            <button className={style.button}>
              <Pomodoro className={style.item} />
            </button>
          </NavLink>
          <NavLink to="/Profile">
            <button className={style.button}>
              <Profile className={style.item} />
            </button>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
