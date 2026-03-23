import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./LineChartWithFilters.css";

// Мок-данные для графика
const data = {
  week: [
    { date: "Jan 1", views: 10, sells: 1 },
    { date: "Jan 2", views: 7, sells: 0 },
    { date: "Jan 3", views: 9, sells: 1 },
    { date: "Jan 4", views: 5, sells: 1 },
    { date: "Jan 5", views: 12, sells: 0 },
    { date: "Jan 6", views: 20, sells: 1 },
    { date: "Jan 7", views: 14, sells: 1 },
  ],
  month: [
    { date: "Week 1", views: 52, sells: 2 },
    { date: "Week 2", views: 61, sells: 5 },
    { date: "Week 3", views: 56, sells: 3 },
    { date: "Week 4", views: 74, sells: 4 },
  ],
  year: [
    { date: "Jan", views: 1200, sells: 1000 },
    { date: "Feb", views: 1500, sells: 1200 },
    { date: "Mar", views: 1800, sells: 1400 },
    { date: "Apr", views: 1600, sells: 1300 },
    { date: "May", views: 2000, sells: 1800 },
    { date: "Jun", views: 2200, sells: 1900 },
    { date: "Jul", views: 2500, sells: 2100 },
  ],
};

const LineChartWithFilters: React.FC = () => {
  const [filter, setFilter] = useState<"week" | "month" | "year">("week");

  const handleFilterChange = (newFilter: "week" | "month" | "year") => {
    setFilter(newFilter);
  };

  return (
    <div className="line-chart-with-filters">
      <div className="line-chart-with-filters__wrapper">
        <h4 className="line-chart-with-filters__title">Перегляди</h4>
        <div className="line-chart-with-filters__filters">
          <button
            className={`filter-button ${filter === "week" ? "active" : ""}`}
            onClick={() => handleFilterChange("week")}
          >
            Week
          </button>
          <button
            className={`filter-button ${filter === "month" ? "active" : ""}`}
            onClick={() => handleFilterChange("month")}
          >
            Month
          </button>
          <button
            className={`filter-button ${filter === "year" ? "active" : ""}`}
            onClick={() => handleFilterChange("year")}
          >
            Year
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data[filter]}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <XAxis dataKey="date" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1C1C1C",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
            }}
          />
          <Line
            dot={false}
            type="monotone"
            dataKey="views"
            stroke="#2ECC71"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            dot={false}
            type="monotone"
            dataKey="sells"
            stroke="#F39C12"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartWithFilters;
