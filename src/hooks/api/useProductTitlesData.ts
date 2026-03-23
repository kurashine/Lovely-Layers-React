import useSWR from "swr";
import qs from "qs";
import { ProductTitlesResponce } from "../../types/productTitlesTypes";

export function useProductTitlesData() {
  const params = qs.stringify(
    {
      populate: ["buy_button"],
    },
    { encodeValuesOnly: true }
  );

  const { data, error, isLoading } = useSWR<ProductTitlesResponce>(
    `/api/product-title?${params}`
  );

  return {
    data,
    isLoading,
    error,
  };
}
