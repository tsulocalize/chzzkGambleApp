import React from "react";
import styles from "./Button.module.css";

const Button = ({ label, onClick, disabled, className }) => {
  return (
    <button
      className={className ? className : `${styles.button}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
