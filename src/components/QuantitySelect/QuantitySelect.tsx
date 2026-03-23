import { FC, useState } from "react";

import "./QuantitySelect.css";

interface IQuantitySelect {
  maxCount?: number;
  minimumCount?: number;
  onChange?: (value: number) => void;
  defaultValue?: number;
}

const QuantitySelect: FC<IQuantitySelect> = ({
  maxCount = 1,
  minimumCount = 0,
  onChange = () => {},
  defaultValue = 1,
}) => {
  const [count, setCount] = useState<number>(defaultValue);

  const handleCount = (type: "plus" | "minus") => {
    switch (type) {
      case "plus":
        if (count + 1 <= maxCount) {
          setCount(count + 1);
          onChange(count + 1);
        }
        break;
      case "minus":
        if (count - 1 !== minimumCount) {
          setCount(count - 1);
          onChange(count - 1);
        }
        break;
    }
  };

  return (
    <div className="quantity-select">
      <button onClick={() => handleCount("minus")}>
        <img src="/static/images/minus-icon.svg" alt="minus" />
      </button>
      <div className="quantity-select__count">{count}</div>
      <button onClick={() => handleCount("plus")}>
        <img src="/static/images/plus-icon.svg" alt="plus" />
      </button>
    </div>
  );
};

export default QuantitySelect;
