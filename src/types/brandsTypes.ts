export type BrandAttributes = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
};

export type BrandData = {
  id: number;
  attributes: BrandAttributes;
};

export type Brands = {
  id: number;
  title: string;
  brands: {
    data: BrandData[];
  };
};
