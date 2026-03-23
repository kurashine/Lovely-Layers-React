import { Amounts } from "./amountsTypes";
import { Brands } from "./brandsTypes";
import { Sizes } from "./sizesTypes";
import { StrapiResponse } from "./strapiRes";

export type SidebarAttributes = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  sidebar: {
    id: number;
    sizes: Sizes;
    amounts: Amounts;
    brands: Brands;
  };
};

export type CategorySidebarResponse = StrapiResponse<SidebarAttributes>;
