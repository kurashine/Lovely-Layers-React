import useSWR from "swr";
import qs from "qs";
import { ProductAttributes, StrapiArrayResponse } from "../../types/strapiRes";

interface IProductsProps {
  slug: string;
  shoesSizeIds: number[];
  brandIds: number[];
  prices: number[];
  page?: number;
  pageSize?: number;
}

export function useProductsData({
  slug,
  shoesSizeIds,
  brandIds,
  prices,
  page,
  pageSize,
}: IProductsProps) {
  const params = qs.stringify(
    {
      populate: ["currency", "category", "images"],
      pagination: {
        page,
        pageSize,
      },
      filters: {
        category: {
          slug: {
            $eq: slug,
          },
        },
        shoes_sizes: {
          id: { $in: shoesSizeIds },
        },
        brand: {
          id: { $in: brandIds },
        },
        price: { $between: prices },
      },
    },
    { encodeValuesOnly: true }
  );

  const { data, error, isLoading } = useSWR<
    StrapiArrayResponse<ProductAttributes>
  >(`/api/products?${params}`);

  return {
    data: data?.data || [],
    isLoading,
    error,
  };
}
