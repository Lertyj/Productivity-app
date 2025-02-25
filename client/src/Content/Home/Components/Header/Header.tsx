import React from "react";
import style from "./Header.module.css";
import { ReactComponent as Bell } from "../../../../svg/bell.svg";
import logo from "../../../../svg/logo.svg";
import avatar from "../../../../svg/avatar.svg";
interface HeaderProps {
  name: string;
  avatar?: string;
  amount?: string;
}

function Header({ name, amount }: HeaderProps) {
  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <div className={style.content}>
          <div className={style.logo}>
            <button>
              <img src={logo} alt="logo" className={style.logo_img} />
            </button>
          </div>
          <div className={style.information}>
            <div className={style.notifications}>
              <button type="button" className={style.button}>
                <Bell className={style.bell} />
                <span className={style.circle}>{amount}</span>
              </button>
            </div>
            <div className={style.profile}>
              <button className={style.button_profile}>
                <h4>{name}</h4>
                <img
                  src={avatar}
                  alt={`${name} 's avatar`}
                  className={style.avatar}
                />
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
