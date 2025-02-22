import React from "react";
import style from "./Button.module.css";
import { NavLink } from "react-router-dom";

interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
  classN?: string;
  navLink?: string;
}

function Button({ text, type, classN, navLink }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${style.button} ${classN ? style[classN] : ""}`}
    >
      {navLink ? (
        <NavLink to={navLink || ""}>{text}</NavLink>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}

export default Button;
