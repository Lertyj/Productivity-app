import React from "react";
import style from "./Button.module.css";
interface button {
  text: string;
}
function Button({ text }: button) {
  return (
    <button type="button" className={style.button}>
      {text}
    </button>
  );
}

export default Button;
