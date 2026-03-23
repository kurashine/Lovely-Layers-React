import React from "react";
import "./SizeButton.css";

interface Props {
  label: string | number;
  selected: boolean;
  onClick: () => void;
}

const SizeButton: React.FC<Props> = ({ label, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`size-button ${selected ? "selected" : ""}`}
    >
      {label}
    </button>
  );
};

export default SizeButton;
