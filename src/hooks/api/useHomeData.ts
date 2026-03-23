import useSWR from "swr";
import qs from "qs";
import { HomeResponse } from "../../types/homeResTypes";

export function useHomeData() {
  const params = qs.stringify(
    {
      populate: [
        "products_discount_button",
        "congratulation",
        "congratulation.img",
        "cards",
        "cards.img",
        "products_discount",
        "product_new",
        "product_new.category",
        "product_new.currency",
        "products_discount.images",
        "products_discount.currency",
        "products_discount.category",
        "product_new.images",
        "product_new_link",
        "home_descs",
      ],
    },
    { encodeValuesOnly: true }
  );

  const { data, error, isLoading } = useSWR<HomeResponse>(
    `/api/home?${params}`
  );

  return {
    data,
    isLoading,
    error,
  };
}
