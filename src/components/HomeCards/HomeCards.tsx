import { FC } from "react";
import { Card } from "../../types/homeResTypes";

import "./HomeCards.css";

interface IHomeCards {
  cards: Card[];
}

const HomeCard: FC<Card> = ({ img, title }) => (
  <div className="home-card">
    <h4>{title}</h4>
    <div className="home-card__img-wrapper">
      <img
        src={process.env.REACT_APP_API_URL + img.data.attributes.url}
        alt={img.data.attributes.alternativeText}
      />
    </div>
  </div>
);

const HomeCards: FC<IHomeCards> = ({ cards }) => {
  return (
    <div className="home-cards">
      {cards.map((card) => (
        <HomeCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export default HomeCards;
