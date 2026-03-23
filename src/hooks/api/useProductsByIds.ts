import useSWR from "swr";
import qs from "qs";

import { ProductAttributes, StrapiArrayResponse } from "../../types/strapiRes";

export const useProductsByIds = (ids: string[] = []) => {
  const params = qs.stringify(
    {
      filters: {
        id: {
          $in: ids,
        },
      },
      populate: ["currency", "category", "images"],
    },

    { encodeValuesOnly: true }
  );

  const { data, error, isLoading } = useSWR<
    StrapiArrayResponse<ProductAttributes>
  >(`/api/products?${params}`);

  if (!ids.length) {
    return {
      data: [],
      isLoading: false,
      error: false,
    };
  }

  return {
    data: data?.data ? data?.data : [],
    isLoading,
    error,
  };
};
