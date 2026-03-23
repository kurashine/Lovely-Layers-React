import { FC } from "react";

import "./styles.css";
import { ButtonProps } from "./types";

export const ButtonDefault: FC<ButtonProps> = ({ buttonProps, ...props }) => {
  return (
    <button
      {...props}
      disabled={props.disabled || buttonProps.disabled}
      style={buttonProps.styles || undefined}
      className="btn btn-default"
    >
      {buttonProps.label}
    </button>
  );
};
