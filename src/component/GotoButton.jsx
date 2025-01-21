import "./GotoButton.css";
import React from "react";

export function GotoButton({name, onClick}) {
  return (
    <button className="learn-more" onClick={onClick}>
      <span className="circle" aria-hidden="true">
      <span className="icon arrow"></span>
      </span>
      <span className="button-text">{name}</span>
    </button>
  )
}