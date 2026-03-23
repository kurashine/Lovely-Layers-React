import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./ConversionRate.css";

const ConversionRate: React.FC = () => {
  const data = [
    { name: "Покупці", value: 27, color: "#F3C703" },
    { name: "Відвідувачі", value: 73, color: "#1C1C1C" },
  ];

  return (
    <div className="conversion-rate">
      <h4 className="conversion-rate__title">Коефіцієнт конверсій</h4>
      <div className="conversion-rate__chart">
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={450}
            paddingAngle={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
        </PieChart>
        <div className="conversion-rate__percentage">{data[0].value}%</div>
      </div>
      <div className="conversion-rate__legend">
        {data.map((entry) => (
          <div key={entry.name} className="conversion-rate__legend-item">
            <span
              className="conversion-rate__legend-color"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="conversion-rate__legend-label">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversionRate;
