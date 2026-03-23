import React from "react";
import "./Tabs.css";

interface TabsProps {
  activeTab: "WEEKLY" | "MONTHLY" | "YEARLY"; // Текущее активное состояние
  onTabChange: (tab: "WEEKLY" | "MONTHLY" | "YEARLY") => void; // Обработчик изменения
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = ["WEEKLY", "MONTHLY", "YEARLY"];

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`tabs__item ${
            activeTab === tab ? "tabs__item--active" : ""
          }`}
          onClick={() => onTabChange(tab as "WEEKLY" | "MONTHLY" | "YEARLY")}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
