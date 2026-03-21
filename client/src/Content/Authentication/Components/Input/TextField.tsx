import React from "react";
import style from "./Input.module.css";

interface TextFieldProps {
  label?: string;
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const TextField = ({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  required = true,
}: TextFieldProps) => (
  <div className={style.block1}>
    {label && (
      <label className={style.label} htmlFor={id}>
        {label}
      </label>
    )}
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
