import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

import "./Product.css";
import { useProductData } from "../../hooks/api/useProductData";
import Price, { Size } from "../../components/Price/Price";
import { useProductTitlesData } from "../../hooks/api/useProductTitlesData";
import { useState } from "react";
import SizeButton from "../../components/SizeButton/SizeButton";
import QuantitySelect from "../../components/QuantitySelect/QuantitySelect";
import Button from "../../components/Buttons";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode, Zoom } from "swiper/modules";
import Swiper from "swiper";
import "swiper/css/zoom";
import { useFavourites } from "../../hooks/logic/useFavourites";
import { useMemo } from "react";
import { useCart } from "../../hooks/logic/useCart";

const Product = () => {
  const { productId } = useParams();

  const [sizeId, setSizeId] = useState<number | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<null | Swiper>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>();

  const { checkIsFav, handleFav, favProductsIds } = useFavourites();

  const { data } = useProductData({ id: productId as string });

  const { handleAddProducts } = useCart();

  const { data: productTitlesData } = useProductTitlesData();

  const handleSize = (size: number) => setSizeId(size);

  const isFav = useMemo(
    () => checkIsFav(productId as string),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productId, favProductsIds]
  );

  if (!data?.data || !productTitlesData?.data) {
    return null;
  }

  const { name, price, currency, desc, shoes_sizes, quantity, images } =
    data.data.attributes;

  const { buy_button, desc_title, size_title } =
    productTitlesData.data.attributes;

  return (
    <Layout withFooter={false}>
      <div className="product">
        <div className="product__images">
          <h3 className="product__title">{name}</h3>
          <Price
            className="product__price"
            size={Size.medium}
            price={price}
            currency={currency.data.attributes.name}
          />
          <SwiperComponent
            zoom
            thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
            modules={[Navigation, Thumbs, FreeMode, Zoom]}
            navigation
            freeMode
            slidesPerView={1}
            className="product__swiper"
          >
            {images.data.map(({ attributes, id }) => (
              <SwiperSlide key={id}>
                <div className="swiper-zoom-container">
                  <img
                    src={process.env.REACT_APP_API_URL + attributes.url}
                    alt={attributes.alternativeText}
                  />
                </div>
              </SwiperSlide>
            ))}
          </SwiperComponent>
          <SwiperComponent
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={images.data.length}
            freeMode
            modules={[FreeMode, Thumbs]}
            className="product__thumbs-swiper"
          >
            {images.data.map(({ attributes, id }) => (
              <SwiperSlide key={id}>
                <img
                  src={process.env.REACT_APP_API_URL + attributes.url}
                  alt={attributes.alternativeText}
                />
              </SwiperSlide>
            ))}
          </SwiperComponent>
        </div>
        <div className="product__details">
          <h6 className="product__details-title">{desc_title}</h6>
          <p className="product__desc">{desc}</p>
          <h6 className="product__details-title">{size_title}</h6>
          <div className="product__sizes">
            {shoes_sizes.data.map(({ id, attributes }) => (
              <SizeButton
                selected={sizeId === id}
                onClick={() => handleSize(id)}
                label={attributes.size}
                key={id}
              />
            ))}
          </div>
          <div className="product__details-footer">
            <QuantitySelect
              maxCount={quantity}
              onChange={(quantity) => setSelectedQuantity(quantity)}
            />
            <Button
              onClick={() =>
                handleAddProducts(String(productId), selectedQuantity)
              }
              buttonProps={buy_button}
              disabled={!sizeId || !quantity}
            />
            <button
              onClick={() => handleFav(productId as string)}
              className="product__favourites-btn"
            >
              <img
                src={
                  isFav
                    ? "/static/images/favourites-filled-product.svg"
                    : "/static/images/favourites-black-product.svg"
                }
                alt="Favourites"
              />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
