import React, { FC } from "react";

import "./CategorySidebar.css";
import Line from "../Line/Line";
import Checkbox from "../Checkbox/Checkbox";
import SizeButton from "../SizeButton/SizeButton";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import { useCategorySidebarData } from "../../hooks/api/useCategorySidebarData";

interface ICategorySidebar {
  shoesSizeIds: number[];
  brandIds: number[];
  prices: number[];
  handleChange: (
    type: "brandIds" | "prices" | "shoesSizeIds",
    value: number | number[]
  ) => void;
}

const CategorySidebar: FC<ICategorySidebar> = ({
  handleChange,
  brandIds,
  prices,
  shoesSizeIds,
}) => {
  const { data } = useCategorySidebarData();

  if (!data?.data) {
    return null;
  }

  const { amounts, brands, sizes } = data.data.attributes.sidebar;

  return (
    <div className="cat-sidebar">
      <div className="cat-sidebar__wrapper">
        <h4 className="cat-sidebar__title">{brands.title}</h4>
        <div className="cat-sidebar__brands">
          {brands.brands.data.map(({ attributes, id }) => (
            <Checkbox
              key={id}
              checked={brandIds.some((brandId) => brandId === id)}
              label={attributes.name}
              onChange={() => handleChange("brandIds", id)}
            />
          ))}
        </div>
      </div>
      <Line />
      <div className="cat-sidebar__wrapper">
        <h4 className="cat-sidebar__title">
          {data?.data.attributes.sidebar.amounts.title}
        </h4>
        <MultiRangeSlider
          handleChange={(values) => {
            handleChange("prices", values);
          }}
          max={amounts.amount_to}
          min={amounts.amount_from}
          currency={amounts.currency.data.attributes.name}
        />
      </div>
      <Line />
      <div className="cat-sidebar__wrapper">
        <h4 className="cat-sidebar__title">
          {data?.data.attributes.sidebar.sizes.title}
        </h4>
        <div className="cat-sidebar__sizes">
          {sizes.sizes.data.map(({ attributes, id }) => (
            <SizeButton
              key={id}
              selected={shoesSizeIds.some((sizeId) => sizeId === id)}
              label={attributes.size}
              onClick={() => handleChange("shoesSizeIds", id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
