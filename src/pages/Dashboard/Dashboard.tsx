import React, { useState } from "react";
import AdminNavigation from "../../components/AdminNavigation/AdminNavigation";
import { useInfoCardsData } from "../../hooks/logic/useInfoCardsData";
import InfoCard from "../../components/InfoCard/InfoCard";
import "./Dashboard.css";
import CategoryPopularity from "../../components/CategoryPopularity/CategoryPopularity";
import ExpensesChart from "../../components/ExpensesChart/ExpensesChart";
import LineChartWithFilters from "../../components/LineChartWithFilters/LineChartWithFilters";
import ConversionRate from "../../components/ConversionRate/ConversionRate";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import Tabs from "../../components/Tabs/Tabs";
import IncomeExpensesChart from "../../components/IncomeExpensesChart/IncomeExpensesChart";

const transactions = [
  {
    date: "8 Січень 2025",
    title: "Замовлення #8",
    amount: 3201,
    // order-icon.svg - это у нас в папке static есть иконка заказа
    icon: "/static/images/order-icon.svg",
    isIncome: true,
  },
  {
    date: "8 Січень 2025",
    title: "Реклама",
    amount: 200,
    // ads.svg - это у нас в папке static есть иконка рекламы
    icon: "/static/images/ads.svg",
    isIncome: false,
  },
  {
    date: "7 Січень 2025",
    title: "Закупівля",
    amount: 1200,
    // shopping-icon.svg - это у нас в папке static есть иконка покупки
    icon: "/static/images/shopping-icon.svg",
    isIncome: false,
  },
  {
    date: "6 Січень 2025",
    title: "Скасування",
    amount: 1500,
    // cancel-icon.svg - это у нас в папке static есть иконка отмены
    isIncome: false,
    icon: "/static/images/cancel-icon.svg",
  },
  {
    date: "6 Січень 2025",
    title: "Поповнення",
    amount: 1200,
    // addition-icon.svg - это у нас в папке static есть иконка пополнения
    icon: "/static/images/addition-icon.svg",
    isIncome: true,
  },
  {
    date: "4 Січень 2025",
    title: "Поповнення",
    amount: 1000,
    // addition-icon.svg - это у нас в папке static есть иконка пополнения
    icon: "/static/images/addition-icon.svg",
    isIncome: true,
  },
  {
    date: "3 Січень 2025",
    title: "Витрати",
    amount: 1200,
    // costs-icon.svg - это у нас в папке static есть иконка расходы
    icon: "/static/images/costs-icon.svg",
    isIncome: false,
  },
  {
    date: "2 Січень 2025",
    title: "Перекази",
    amount: 1200,
    // transfers-icon.svg - это у нас в папке static есть иконка переводов
    icon: "/static/images/transfers-icon.svg",
    isIncome: false,
  },
];

const Dashboard: React.FC = () => {
  // карточки слева и справа тут все данные

  const [filter, setFilter] = useState<"income" | "expense">("income");
  const [activeTab, setActiveTab] = useState<"WEEKLY" | "MONTHLY" | "YEARLY">(
    "MONTHLY"
  );

  const infoCardsData = useInfoCardsData(activeTab);

  const handleTabChange = (tab: "WEEKLY" | "MONTHLY" | "YEARLY") => {
    setActiveTab(tab);
  };

  return (
    <>
      <AdminNavigation />
      <div className="dashboard">
        <div className="dashboard__column">
          {infoCardsData.slice(0, 2).map((card) => (
            <InfoCard
              id={card.id}
              key={card.id}
              icon={card.icon}
              title={card.title}
              value={card.value}
              tooltipInfo={card.tooltipInfo}
            />
          ))}
          {/* график полулярности категорий внутри него все данные для графика */}
          <CategoryPopularity activeTab={activeTab} />

          {infoCardsData.slice(2, 4).map((card) => (
            <InfoCard
              id={card.id}
              key={card.id}
              icon={card.icon}
              title={card.title}
              value={card.value}
              tooltipInfo={card.tooltipInfo}
            />
          ))}
        </div>
        <div className="dashboard__center">
          <img src="/static/images/BIGPLUS.png" className="plus" alt="BIGPUS" />
          {/* график доходы и расходы тот что центральный в нем все данные*/}
          <IncomeExpensesChart
            filter={filter}
            onFilterChange={setFilter}
            activeTab={activeTab}
          />
          <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
          <div className="dashboard__transactions">
            {transactions
              .filter(({ isIncome }) =>
                filter === "income" ? isIncome : !isIncome
              )
              .map((transaction, index) => (
                <TransactionCard
                  key={index}
                  date={transaction.date}
                  title={transaction.title}
                  amount={transaction.amount}
                  icon={transaction.icon}
                  isIncome={transaction.isIncome}
                />
              ))}
          </div>
        </div>
        <div className="dashboard__column">
          {infoCardsData.slice(4, 6).map((card) => (
            <InfoCard
              id={card.id}
              key={card.id}
              icon={card.icon}
              title={card.title}
              value={card.value}
              tooltipInfo={card.tooltipInfo}
            />
          ))}
          {/* график расходов внутри него все данные */}
          <ExpensesChart activeTab={activeTab} />

          {infoCardsData.slice(6).map((card) => (
            <InfoCard
              id={card.id}
              key={card.id}
              icon={card.icon}
              title={card.title}
              value={card.value}
              tooltipInfo={card.tooltipInfo}
            />
          ))}
        </div>
      </div>
      <div className="dashboard-end">
        <LineChartWithFilters />
        <ConversionRate />
      </div>
    </>
  );
};

export default Dashboard;
