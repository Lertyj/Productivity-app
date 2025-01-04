import React from "react";
import style from "./Header.module.css";
import { ReactComponent as Bell } from "../../../../svg/bell.svg";

interface HeaderProps {
  name: string;
  avatar: string;
}

function Header({ name, avatar }: HeaderProps) {
  return (
    <header className={style.wrapper}>
      <div className={style.notifications}>
        <Bell />
      </div>
      <div className={style.profile}>
        <img src={avatar} alt={`${name} 's avatar`} className={style.avatar} />
        {name}
      </div>
    </header>
  );
}

export default Header;
