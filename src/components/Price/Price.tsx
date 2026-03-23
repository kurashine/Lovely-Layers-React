import { FC } from "react";

import "./Price.css";

export enum Size {
  small = "1rem",
  medium = "1.3rem",
  large = "2rem",
}

export interface IPrice {
  className?: string;
  price: number | string;
  currency?: string;
  size?: Size;
  color?: string;
}

const Price: FC<IPrice> = ({
  price,
  size = Size.small,
  color = "#595959",
  currency = "",
  className = "",
}) => {
  return (
    <span
      className={`price ${className}`}
      style={{
        color,
        fontSize: size,
        fontWeight: size === Size.large ? 600 : "normal",
      }}
    >
      {price},00 {currency}
    </span>
  );
};

export default Price;
