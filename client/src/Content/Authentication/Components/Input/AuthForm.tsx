import React from "react";
import style from "./Input.module.css";
import Button from "../Button/Button";

interface AuthFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  error?: string;
  submitText: string;
  secondaryButton?: React.ReactNode;
  showPrivacy?: boolean;
}

const AuthForm = ({
  children,
  onSubmit,
  error,
  submitText,
  secondaryButton,
  showPrivacy,
}: AuthFormProps) => {
  return (
    <form className={style.wrapper} onSubmit={onSubmit}>
      {children}

      <div className={style.error_buttons}>
        {error && <p className={style.error}>{error}</p>}

        {showPrivacy && (
          <div className={style.privacy}>
            <button type="button" className={style.button}>
              <label className={style.label}>
                <input
                  type="checkbox"
                  className={style.real_checkbox}
                  required
                />
                <span className={style.custom_checkbox}></span>
              </label>
            </button>
            <p>
              I agree to{" "}
              <span className={style.privacyspan}>Terms and Condition</span> and{" "}
              <span className={style.privacyspan}>Privacy Policy</span>
            </p>
          </div>
        )}

        <div className={style.block}>
          <div className={style.buttons}>
            <Button text={submitText} type="submit" />
            {secondaryButton}
          </div>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
