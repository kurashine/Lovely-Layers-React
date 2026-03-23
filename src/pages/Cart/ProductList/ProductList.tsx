import React from "react";
import "../Cart.css";
import QuantitySelect from "../../../components/QuantitySelect/QuantitySelect";
import Price, { Size } from "../../../components/Price/Price";

interface ProductListProps {
  products: any[];
  cartProducts: { id: string; count: number }[];
  currencyName: string;
  handleUpdateOrRemoveProduct: (id: string, quantity: number) => void;
  size: "small" | "large";
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  cartProducts,
  currencyName,
  handleUpdateOrRemoveProduct,
  size,
}) => {
  return (
    <>
      {products.map(({ id, attributes }) => {
        const selectedQuantity =
          cartProducts.find((product) => product.id === String(id))?.count || 0;

        return (
          <div
            key={id}
            className={`cart__products-item cart__products-item__${size}`}
          >
            <img
              alt={attributes.images.data[0].attributes.alternativeText}
              src={
                process.env.REACT_APP_API_URL +
                attributes.images.data[0].attributes.url
              }
            />
            <div className="cart__products-item-hero">
              <div className="cart__products-item-hero-info">
                <span className="cart__products-item-hero-name">
                  {attributes.name}
                </span>
                <Price
                  className="cart__products-item-hero-price"
                  size={Size.small}
                  price={attributes.price}
                  currency={currencyName}
                />
              </div>
              <QuantitySelect
                minimumCount={-1}
                maxCount={attributes.quantity}
                defaultValue={selectedQuantity}
                onChange={(quantity) => {
                  handleUpdateOrRemoveProduct(String(id), quantity);
                }}
              />
              <Price
                className="cart__products-item-hero-price"
                color="var(--dark-color)"
                size={size === "large" ? Size.medium : Size.small}
                price={Number(attributes.price) * selectedQuantity}
                currency={currencyName}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductList;
