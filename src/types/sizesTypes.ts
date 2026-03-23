export type SizeAttributes = {
  size: number;
  createdAt: string;
  updatedAt: string;
};

export type SizeData = {
  id: number;
  attributes: SizeAttributes;
};

export type Sizes = {
  id: number;
  title: string;
  sizes: {
    data: SizeData[];
  };
};
