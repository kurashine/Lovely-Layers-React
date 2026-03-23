import { FC } from "react";

import { ButtonDefault } from "./ButtonDefault";

import "./styles.css";
import { ButtonLinkProps, ButtonProps } from "./types";
import { ButtonLink } from "./ButtonLink";

type IButton = ButtonProps &
  ButtonLinkProps & {
    btnType?: "link";
  };

const Button: FC<IButton> = ({ btnType, ...props }) => {
  switch (btnType) {
    case "link":
      return <ButtonLink {...props} />;
    default:
      return <ButtonDefault {...props} />;
  }
};

export default Button;
