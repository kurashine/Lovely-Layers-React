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

  // 1. Отримуємо категорію (враховуємо, що тепер це може бути масив)
  // ПЕРЕВІР: якщо в Strapi поле перейменувалося на categories, заміни .category на .categories
  const categoryAttributes = product.attributes.category?.data?.[0]?.attributes 
    || (product.attributes as any).categories?.data?.[0]?.attributes;
    
  const categorySlug = categoryAttributes?.slug || "all";

  // 2. Безпечне отримання картинки
  const imageData = product.attributes.images?.data?.[0]?.attributes;
  const imageUrl = imageData?.url 
    ? process.env.REACT_APP_API_URL + imageData.url 
    : "/placeholder.png";

  return (
    <Link
      className="product-card"
      // Використовуємо знайдений slug
      to={`/categories/${categorySlug}/${product.id}`}
    >
      <img
        className="product-card__img"
        src={imageUrl}
        alt={imageData?.alternativeText || product.attributes.name}
      />
      <div className="product-card__hero">
        <div>
          <p>{product.attributes.name}</p>
          <Price
            // Додаємо ? для валюти
            currency={product.attributes.currency?.data?.attributes?.name || "грн"}
            price={product.attributes.price}
          />
        </div>
        {showTrash && (
          <button onClick={handleTrashClick}>
            <img
              src="/static/images/trash-gray.svg" // Додав / на початку для коректного шляху
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
