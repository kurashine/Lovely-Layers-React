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
  return (
    <div className="container slide-card">
      <div className="slide-card__info">
        <div>
          <h2>{data.name}</h2>
          <p>{data.desc_short}</p>
        </div>
        <div>
          <PriceWithDiscount
            currency={data.currency.data.attributes.name}
            discountPrice={data.discount_price as string}
            price={data.price}
          />
          <Button
            href={`/categories/${data.category.data.attributes.slug}/${id}`}
            btnType="link"
            buttonProps={productsDiscountButton}
          />
        </div>
      </div>
      <div>
        <img
          className="slide-card__img"
          src={
            process.env.REACT_APP_API_URL + data.images.data[0].attributes.url
          }
          alt={data.images.data[0].attributes.alternativeText}
        />
      </div>
    </div>
  );
};

export default SlideCard;
