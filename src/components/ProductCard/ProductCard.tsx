import { FC } from "react";
import { Product } from "../../types/strapiRes";

import "./ProductCard.css";
import Price from "../Price/Price";
import { Link } from "react-router-dom";

interface IProductCard {
  product: Product;
  showTrash?: boolean;
  onTrashClick?: () => void;
}

const ProductCard: FC<IProductCard> = ({
  product,
  showTrash,
  onTrashClick,
}) => {
  const handleTrashClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onTrashClick?.();
  };

  return (
    <Link
      className="product-card"
      to={`/categories/${product.attributes.category.data.attributes.slug}/${product.id}`}
    >
      <img
        className="product-card__img"
        src={
          process.env.REACT_APP_API_URL +
          product.attributes.images.data[0].attributes.url
        }
        alt={product.attributes.images.data[0].attributes.alternativeText}
      />
      <div className="product-card__hero">
        <div>
          <p>{product.attributes.name}</p>
          <Price
            currency={product.attributes.currency.data.attributes.name}
            price={product.attributes.price}
          />
        </div>
        {showTrash && (
          <button onClick={handleTrashClick}>
            <img
              src="static/images/trash-gray.svg"
              alt="Trash"
              className="product-card__trash"
            />
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
