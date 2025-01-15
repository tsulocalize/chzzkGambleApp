import React from "react";
import styles from "./Button.module.css";

const SpinningButton = ({ label1, label2, onClick1, onClick2, isType1, className }) => {
  return (
    <button
      className={className ? className : `${styles.button}`}
      onClick={isType1 ? onClick1 : onClick2}
    >
      {isType1 ? label1 : label2}
    </button>
  );
};

export default SpinningButton;
