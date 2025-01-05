import React from "react";
import style from "./Button.module.css";

interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
}

function Button({ text, type }: ButtonProps) {
  return (
    <button type={type} className={style.button}>
      {text}
    </button>
  );
}

export default Button;
