import React from "react";
import "./Checkbox.css";

interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<Props> = ({ label, checked, onChange }) => {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={label}
        checked={checked}
        onChange={onChange}
        className="checkbox-input"
      />
      <label
        htmlFor={label}
        className={`checkbox-label ${checked ? "checked" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
