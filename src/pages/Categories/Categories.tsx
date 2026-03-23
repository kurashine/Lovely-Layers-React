import { useState } from "react";
import CategorySidebar from "../../components/CategorySidebar/CategorySidebar";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useProductsData } from "../../hooks/api/useProductsData";

import "./Categories.css";
import { useParams } from "react-router-dom";

const Categories = () => {
  let { slug } = useParams();

  const [brandIds, setBrandIds] = useState<number[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [shoesSizeIds, setShoesSizeIds] = useState<number[]>([]);

  const { data } = useProductsData({
    brandIds,
    prices,
    shoesSizeIds,
    slug: slug as string,
  });

  const handleChange = (
    type: "brandIds" | "prices" | "shoesSizeIds",
    value: number | number[]
  ) => {
    switch (type) {
      case "brandIds":
        setBrandIds(
          brandIds.find((id) => id === value)
            ? brandIds.filter((id) => id !== value)
            : [...brandIds, value as number]
        );
        return;
      case "prices":
        setPrices(value as number[]);
        return;
      case "shoesSizeIds":
        setShoesSizeIds(
          shoesSizeIds.find((id) => id === value)
            ? shoesSizeIds.filter((id) => id !== value)
            : [...shoesSizeIds, value as number]
        );
        return;
      default:
        return;
    }
  };

  return (
    <Layout
      className="cat-layout"
      sidebarComponent={
        <CategorySidebar
          brandIds={brandIds}
          prices={prices}
          shoesSizeIds={shoesSizeIds}
          handleChange={handleChange}
        />
      }
    >
      {/* TODO: should add pagination logic */}
      {/* TODO: should add loadin logic */}
      {/* TODO: should add empty data logic */}
      <div className="cat">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
