import { StrapiArrayResponse } from "./strapiRes";

export interface CategoryAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  slug: string;
  label: string;
}

export type CategoryResponse = StrapiArrayResponse<CategoryAttributes>;
