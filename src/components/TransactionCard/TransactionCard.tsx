import React from "react";
import "./TransactionCard.css";

interface TransactionCardProps {
  date: string; // Дата транзакции
  title: string; // Название транзакции
  amount: number; // Сумма транзакции
  icon: string; // URL или путь к иконке
  isIncome?: boolean; // Если доход, true, если расход, false
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  date,
  title,
  amount,
  icon,
  isIncome = true,
}) => {
  return (
    <div className="transaction-card">
      <div className="transaction-card__header">{date}</div>
      <div className="transaction-card__content">
        <img
          src={icon}
          alt="Transaction Icon"
          className="transaction-card__icon"
        />
        <span className="transaction-card__title">{title}</span>
        <span
          className={`transaction-card__amount ${
            isIncome
              ? "transaction-card__amount--income"
              : "transaction-card__amount--expense"
          }`}
        >
          {isIncome ? "+" : "-"}₴{amount.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default TransactionCard;
