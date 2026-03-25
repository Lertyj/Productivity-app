import React from "react";
import style from "./Input.module.css";

interface TextFieldProps {
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const TextField = ({
  type,
  id,
  placeholder,
  value,
  onChange,
  required = true,
}: TextFieldProps) => (
  <div className={style.wrapper}>
    <input
      className={style.textinput}
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  </div>
);

export default TextField;
