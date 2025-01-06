import React from "react";
import style from "./Button.module.css";

interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
  classN?: string;
}

function Button({ text, type, classN }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${style.button} ${classN ? style[classN] : ""}`}
    >
      {text}
    </button>
  );
}

export default Button;
