import useSWR from "swr";
import qs from "qs";

import { CartResponse } from "../../types/carts";

export function useCartPageData() {
  const params = qs.stringify(
    {
      populate: [
        "currency",
        "cart_view",
        "cart_order_view",
        "cart_order_view.delivery",
        "cart_order_view.delivery.deliveries",
        "cart_order_view.recipient",
        "cart_order_view.payment",
        "cart_order_view.payment.payments",
        "payments",
        "summary",
        "summary.pay_button",
        "summary.price_label",
        "summary.deliveryPrice_label",
        "summary.fullPrice_label",
        "summary.section_title",
      ],
    },
    { encodeValuesOnly: true }
  );

  const { data, error, isLoading } = useSWR<CartResponse>(
    `/api/cart?${params}`
  );

  return {
    data,
    isLoading,
    error,
  };
}
