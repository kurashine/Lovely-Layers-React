import { FC } from "react";

import "./styles.css";
import { ButtonLinkProps } from "./types";
import { Link } from "react-router-dom";

export const ButtonLink: FC<ButtonLinkProps> = ({
  buttonProps,
  href = "",
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={props.disabled || buttonProps.disabled}
      style={buttonProps.styles || undefined}
      className="btn btn-link"
    >
      <Link style={buttonProps.styles || undefined} to={href}>
        {buttonProps.label}
      </Link>
    </button>
  );
};
