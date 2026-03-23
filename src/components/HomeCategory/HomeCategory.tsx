import { FC } from "react";
import { Product } from "../../types/strapiRes";

import "./HomeCategory.css";
import ProductCard from "../ProductCard/ProductCard";
import { CategoryAttributes } from "../../types/categoryRes";
import { Link } from "react-router-dom";

interface IHomeCategory {
  isLoading: boolean;
  products: Product[];
  title: string;
  productNewLink: CategoryAttributes;
  productNewLinkText: string;
}

const HomeCategory: FC<IHomeCategory> = ({
  products,
  isLoading,
  title,
  productNewLink,
  productNewLinkText,
}) => {
  return (
    <div className="home-category">
      <h3 className="home-category__title">{title}</h3>
      <div className="home-category__cards">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        className="home-category__link"
        to={`/categories/${productNewLink.slug}`}
      >
        <span>{productNewLinkText}</span>
        <img src="/static/images/arrow-right.svg" alt="Arrow Right" />
      </Link>
    </div>
  );
};

export default HomeCategory;
