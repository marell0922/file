import React from "react";
import "./roundButton.css";
const roundButton = ({ title, onClick, abled }) => (
  <input type="button" className="button" value={title} onClick={onClick} />
);

export default roundButton;
