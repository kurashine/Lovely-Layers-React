import { CategoryAttributes } from "./categoryRes";
import { SizeAttributes } from "./sizesTypes";

export interface StrapiResponseData<T> {
  id: number;
  attributes: T;
}

export interface Currency {
  name: string;
}

export interface ProductAttributes {
  name: string;
  desc: string;
  price: string;
  quantity: number;
  status: string;
  has_discount: boolean;
  discount_price: null | string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  shoes_sizes: StrapiArrayResponse<SizeAttributes>;
  category: StrapiResponse<CategoryAttributes>;
  currency: StrapiResponse<Currency>;
  desc_short: null | string;
  images: {
    data: Media[];
  };
}

export interface Product {
  id: number;
  attributes: ProductAttributes;
}

export interface StrapiResponse<T> {
  data: StrapiResponseData<T>;
  meta: Record<string, unknown>;
}

export interface StrapiArrayResponse<T> {
  data: StrapiResponseData<T>[];
  meta: Record<string, unknown>;
}

export interface MediaFormats {
  thumbnail: {
    url: "/uploads/thumbnail_SS_23_OBM_24_Z_77_X_F3_40668e4b3e.jpg";
  };
  small: {
    url: "/uploads/small_SS_23_OBM_24_Z_77_X_F3_40668e4b3e.jpg";
  };
  medium: {
    url: "/uploads/medium_SS_23_OBM_24_Z_77_X_F3_40668e4b3e.jpg";
  };
  large: {
    url: "/uploads/large_SS_23_OBM_24_Z_77_X_F3_40668e4b3e.jpg";
  };
}

export interface Button {
  disabled?: boolean;
  label: React.ReactNode;
  id: number;
  styles: object | null;
}

export interface Media {
  id: number;
  attributes: {
    alternativeText: string;
    url: string;
    formats: MediaFormats | null;
  };
}
