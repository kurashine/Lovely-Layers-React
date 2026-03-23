import useSWR from "swr";
import qs from "qs";
import { ProductAttributes, StrapiResponse } from "../../types/strapiRes";

interface IProductsProps {
  id: number | string;
}

export function useProductData({ id }: IProductsProps) {
  const params = qs.stringify(
    {
      populate: ["currency", "images", "shoes_sizes"],
    },
    { encodeValuesOnly: true }
  );

  const { data, error, isLoading } = useSWR<StrapiResponse<ProductAttributes>>(
    `/api/products/${id}?${params}`
  );

  return {
    data,
    isLoading,
    error,
  };
}
