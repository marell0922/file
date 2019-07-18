import React from "react";
import "./inputText.css";

const textField = props => {
  return (
    <input
      type="text"
      className="textField"
      value={props.data}
      onChange={props.onChange}
    />
  );
};

export default textField;
