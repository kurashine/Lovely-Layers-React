import { FC } from "react";
import {
  Button as ButtonTyp,
  ProductAttributes,
} from "../../../types/strapiRes";
import { PriceWithDiscount } from "../../PriceWithDiscount/PriceWithDiscount";

import "./SlideCard.css";
import Button from "../../Buttons";

interface Props {
  id: number;
  data: ProductAttributes;
  productsDiscountButton: ButtonTyp;
}

const SlideCard: FC<Props> = ({ id, data, productsDiscountButton }) => {
  // 1. Безпечно отримуємо slug категорії (враховуємо масив Many-to-Many)
  // Перевіряємо і однину .category, і множину .categories на всякий випадок
  const categoryData = (data as any).categories?.data || (data as any).category?.data;
  const categorySlug = categoryData?.[0]?.attributes?.slug || "all";

  // 2. Безпечно отримуємо валюту
  const currencyName = data.currency?.data?.attributes?.name || "грн";

  // 3. Безпечно отримуємо першу картинку
  const firstImageData = data.images?.data?.[0]?.attributes;
  const imageUrl = firstImageData?.url 
    ? process.env.REACT_APP_API_URL + firstImageData.url 
    : "/placeholder.png";

  return (
    <div className="container slide-card">
      <div className="slide-card__info">
        <div>
          <h2>{data.name}</h2>
          <p>{data.desc_short}</p>
        </div>
        <div>
          <PriceWithDiscount
            currency={currencyName}
            discountPrice={data.discount_price as string}
            price={data.price}
          />
          <Button
            // Використовуємо знайдений slug
            href={`/categories/${categorySlug}/${id}`}
            btnType="link"
            buttonProps={productsDiscountButton}
          />
        </div>
      </div>
      <div>
        <img
          className="slide-card__img"
          src={imageUrl}
          alt={firstImageData?.alternativeText || data.name}
        />
      </div>
    </div>
  );
};

export default SlideCard;
