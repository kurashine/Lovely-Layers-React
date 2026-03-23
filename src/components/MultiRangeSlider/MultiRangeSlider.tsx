import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import debounce from "lodash.debounce";
import "./MultiRangeSlider.css";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  handleChange: (value: number[]) => void;
  currency?: string;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
  min,
  max,
  currency = "",
  handleChange,
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const debouncedFunc = debounce(() => {
      handleChange([minVal, maxVal]);
    }, 300);
    debouncedFunc();
    return () => {
      debouncedFunc.cancel();
    };
  }, [maxVal, minVal, handleChange]);

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="slider">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(Number(event.target.value), maxVal - 10);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 ? "5" : undefined }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(Number(event.target.value), minVal + 10);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div>
        <div className="slider__track"></div>
        <div ref={range} className="slider__range"></div>
        <div className="slider__values">
          <div className="slider__left-value">
            {minVal} {currency}
          </div>
          <div className="slider__right-value">
            {maxVal} {currency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
