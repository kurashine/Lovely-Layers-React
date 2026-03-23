import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./CategoryPopularity.css";
import { useCategoryPopularityData } from "../../hooks/logic/useCategoryPopularityData";

// const [activeTab, setActiveTab] = useState<"WEEKLY" | "MONTHLY" | "YEARLY">(
//   "MONTHLY"
// );

interface CategoryPopularityProps {
  activeTab: "WEEKLY" | "MONTHLY" | "YEARLY";
}

const CategoryPopularity: React.FC<CategoryPopularityProps> = ({
  activeTab,
}) => {
  // тут твои данные для графика
  const { categories, percentage } = useCategoryPopularityData(activeTab);

  return (
    <div className="category-popularity">
      <h4 className="category-popularity__title">Популярність категорій</h4>
      <div className="category-popularity__chart">
        <PieChart width={200} height={200}>
          <Pie
            data={categories}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={0}
          >
            {categories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div className="category-popularity__percentage">{percentage}%</div>
      </div>
      <div className="category-popularity__legend">
        {categories.map((category) => (
          <div key={category.name} className="category-popularity__legend-item">
            <span
              className="category-popularity__legend-color"
              style={{ backgroundColor: category.color }}
            ></span>
            <span className="category-popularity__legend-label">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPopularity;
