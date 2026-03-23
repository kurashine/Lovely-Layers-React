import { Button, StrapiResponse } from "./strapiRes";

export type ProductTitlesAttributes = {
  desc_title: string;
  size_title: string;
  buy_button: Button;
};

export type ProductTitlesResponce = StrapiResponse<ProductTitlesAttributes>;
