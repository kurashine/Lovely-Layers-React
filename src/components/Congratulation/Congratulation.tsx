import React, { FC } from "react";
import { Congratulation as CongratulationType } from "../../types/homeResTypes";

import "./Congratulation.css";

interface ICongratulation {
  congratulation: CongratulationType;
}

const Congratulation: FC<ICongratulation> = ({ congratulation }) => {
  return (
    <div className="congratulation">
      <div className="congratulation__title-wrapper">
        <img
          alt={congratulation.img.data.attributes.alternativeText}
          src={
            process.env.REACT_APP_API_URL +
            congratulation.img.data.attributes.url
          }
        />
        <h3>{congratulation.title}</h3>
      </div>
      <h3 className="congratulation__subtitle">{congratulation.subtitle}</h3>
      <p className="congratulation__text">{congratulation.text}</p>
    </div>
  );
};

export default Congratulation;
