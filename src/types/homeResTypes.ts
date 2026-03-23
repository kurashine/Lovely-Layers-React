import { CategoryAttributes } from "./categoryRes";
import { Button, Media, Product, StrapiResponse } from "./strapiRes";

export interface Card {
  id: number;
  title: string;
  img: {
    data: Media;
  };
}

export interface HomeDesc {
  id: number;
  attributes: {
    text: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
  };
}

export interface Congratulation {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  img: {
    data: Media;
  };
}

export interface HomeAttributes {
  desc: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  congratulation: Congratulation;
  home_descs: {
    data: HomeDesc[];
  };
  product_new_link: StrapiResponse<CategoryAttributes>;
  product_new_link_text: string;
  cards: Card[];
  products_discount: {
    data: Product[];
  };
  products_discount_button: Button;
  product_new_title: string;
  product_new: {
    data: Product[];
  };
  localizations: {
    data: any[];
  };
}

export type HomeResponse = StrapiResponse<HomeAttributes>;
