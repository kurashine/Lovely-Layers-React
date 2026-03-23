import { FC } from "react";
import { Button, Product } from "../../types/strapiRes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "./Header.css";
import SlideCard from "./SlideCard/SlideCard";

interface Props {
  productsDiscountButton: Button;
  isLoading: boolean;
  products: Product[];
}

const Header: FC<Props> = ({ products, isLoading, productsDiscountButton }) => {
  return (
    <header className="header">
      <Swiper
        slidesPerView={1}
        navigation
        modules={[Navigation, Pagination]}
        className="header__swiper"
      >
        {products.map(({ attributes, id }) => (
          <SwiperSlide key={id}>
            <SlideCard
              id={id}
              data={attributes}
              productsDiscountButton={productsDiscountButton}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </header>
  );
};

export default Header;
