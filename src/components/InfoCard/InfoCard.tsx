import React from "react";
import { Tooltip } from "react-tooltip";
import "./InfoCard.css";

interface InfoCardProps {
  icon: string; // Путь к SVG-иконке или картинке
  title: string; // Заголовок (например, "Загальний дохід")
  value: string; // Значение (например, "34.300 грн")
  tooltipInfo?: string; // Информация для tooltip (например, "Общий доход за месяц")
  id: string; // ID для tooltip
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  value,
  tooltipInfo,
  id,
}) => {
  return (
    <div className="info-card">
      <div className="info-card__content">
        <div className="info-card__icon-container">
          <img src={icon} alt="icon" className="info-card__icon" />
        </div>
        <div className="info-card__text">
          <h3 className="info-card__title">{title}</h3>
          <h2 className="info-card__value">{value}</h2>
        </div>
      </div>
      {tooltipInfo && (
        <>
          <div
            data-tooltip-id={id}
            data-tooltip-content={tooltipInfo}
            data-tooltip-place="top"
            className="info-card__tooltip"
          >
            <img src="/static/images/info-circle.svg" alt="info-circle" />
          </div>
          <Tooltip id={id} place="top" />
        </>
      )}
    </div>
  );
};

export default InfoCard;
