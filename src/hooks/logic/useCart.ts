import { useLocalStorage } from "usehooks-ts";
import { useCallback, useState } from "react";
import { TCarts } from "../../types/carts";
import axiosInstance from "../../utils/axios";

interface OrderProduct {
  id: number | string; // ID продукта
  count: number; // Количество
}

interface CreateOrderPayload {
  firstName: string;
  lastName: string;
  middleName?: string;
  deliveryId: number; // ID доставки
  paymentId: number; // ID способа оплаты
  deliveryAddress: string; // Адрес доставки
  products: OrderProduct[]; // Продукты в заказе
  price: number; // Цена товаров
  deliveryPrice: number; // Стоимость доставки
  totalPrice: number; // Итоговая сумма
}

export const useCart = () => {
  const [products, setProducts] = useLocalStorage<TCarts>("cart", []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddProducts = useCallback(
    (productId: string, count?: number) => {
      const productInCart = products.find(({ id }) => productId === id);

      if (productInCart) {
        const newProducts = products.map((p) =>
          p.id === productInCart.id
            ? {
                ...p,
                count: count ? count : p.count + 1,
              }
            : p
        );

        setProducts(newProducts);
        return;
      }

      setProducts([...products, { id: productId, count: count ? count : 1 }]);
    },
    [products, setProducts]
  );

  const handleUpdateOrRemoveProduct = useCallback(
    (productId: string, count?: number) => {
      const productInCart = products.find(({ id }) => productId === id);

      if (!productInCart) return;

      if (count === 0) {
        const newProducts = products.filter((p) => p.id !== productId);
        setProducts(newProducts);
      }

      if (count) {
        const newProducts = products.map((p) =>
          p.id === productId
            ? {
                ...p,
                count: count,
              }
            : p
        );
        setProducts(newProducts);
        return;
      }

      if (productInCart.count - 1 > 0) {
        const newProducts = products.map((p) =>
          p.id === productId
            ? {
                ...p,
                count: p.count - 1,
              }
            : p
        );
        setProducts(newProducts);
      } else {
        const newProducts = products.filter((p) => p.id !== productId);
        setProducts(newProducts);
      }
    },
    [products, setProducts]
  );

  const handleClearCart = useCallback(() => {
    setProducts([]);
  }, [setProducts]);

  const submitOrder = async (orderData: CreateOrderPayload) => {
    const {
      firstName,
      lastName,
      middleName,
      deliveryId,
      paymentId,
      deliveryAddress,
      products,
      price,
      deliveryPrice,
      totalPrice,
    } = orderData;

    const body = {
      data: {
        firstName,
        lastName,
        middleName: middleName || "",
        delivery: deliveryId,
        payment: paymentId,
        deliveryAddress,
        price,
        delivery_price: deliveryPrice,
        total_price: totalPrice,
        products: products.map((p) => ({
          product: p.id, // ID продукта
          count: p.count, // Количество
        })),
      },
    };
    setIsLoading(true);
    setError(null);

    try {
      const token = process.env.REACT_APP_API_TOKEN; // Replace with your actual API token

      await axiosInstance.post(`api/orders`, body, {
        headers: {
          // "Content-Type": "application/json",
          // Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      handleClearCart();
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
      throw new Error(err?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    isLoading,
    error,
    handleAddProducts,
    handleUpdateOrRemoveProduct,
    handleClearCart,
    submitOrder,
  };
};
