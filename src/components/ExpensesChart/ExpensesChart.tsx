import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./ExpensesChart.css";

// 100 - 52 = 48
// 48 - 15 = 33
// 33 - 18 = 15

const ExpensesChart = ({
  activeTab,
}: {
  activeTab: "WEEKLY" | "MONTHLY" | "YEARLY";
}) => {
  const data = {
    WEEKLY: [
      { name: "Інше", value: 0, color: "#71717A" },
      { name: "Хостинг", value: 0, color: "#22C55E" },
      { name: "Скасування", value: 10, color: "#DC2626" },
      { name: "Переказ", value: 10, color: "#38BDF8   " },
      { name: "Реклама", value: 20, color: "#4F46E5" },
      { name: "Закупівля", value: 60, color: "#FACC15" },
    ],
    MONTHLY: [
      { name: "Інше", value: 5, color: "#71717A" },
      { name: "Хостинг", value: 5, color: "#22C55E" },
      { name: "Скасування", value: 10, color: "#DC2626" },
      { name: "Переказ", value: 20, color: "#38BDF8   " },
      { name: "Реклама", value: 30, color: "#4F46E5" },
      { name: "Закупівля", value: 40, color: "#FACC15" },
    ],
    YEARLY: [
      { name: "Інше", value: 6, color: "#71717A" },
      { name: "Хостинг", value: 5, color: "#22C55E" },
      { name: "Скасування", value: 9, color: "#DC2626" },
      { name: "Переказ", value: 12, color: "#38BDF8   " },
      { name: "Реклама", value: 28, color: "#4F46E5" },
      { name: "Закупівля", value: 52, color: "#FACC15" },
    ],
  };

  // процент по средине
  
  const percentage = (() => {
    switch (activeTab) {
      case "WEEKLY":
        return 60;
      case "MONTHLY":
        return 40;
      case "YEARLY":
        return 52;
      default:
        return 72;
    }
  })();

  return (
    <div className="expenses-chart">
      <h4 className="expenses-chart__title">Витрати</h4>
      <div className="expenses-chart__chart">
        <PieChart width={200} height={200}>
          <Pie
            data={data[activeTab]}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={50}
            fill="#8884d8"
            outerRadius={80}
            paddingAngle={0}
          >
            {data[activeTab].map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div className="expenses-chart__percentage">{percentage}%</div>
      </div>
      <div className="expenses-chart__legend">
        {data[activeTab].map((item) => (
          <div key={item.name} className="expenses-chart__legend-item">
            <span
              className="expenses-chart__legend-color"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="expenses-chart__legend-label">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesChart;
