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
  deliveryId: number; 
  paymentId: number; 
  phone: string; 
  email: string; 
  deliveryAddress: string; 
  products: OrderProduct[]; 
  price: number; 
  deliveryPrice: number; 
  totalPrice: number; 
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
        return;
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
    // 1. Розпаковуємо дані, які прийшли з форми
    const {
      firstName,
      lastName,
      middleName,
      deliveryId,
      phone,
      email,
      paymentId,
      deliveryAddress,
      products: productsFromForm, // Це товари, які ми передаємо в функцію
      price,
      deliveryPrice,
      totalPrice,
    } = orderData;

    // 2. Формуємо правильний об'єкт для Strapi
    const body = {
    data: {
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      middleName: orderData.middleName || "",
      phone: orderData.phone,
      email: orderData.email,
      delivery: orderData.deliveryId, // Переконайся, що це ID (число)
      payment: orderData.paymentId,   // Переконайся, що це ID (число)
      deliveryAddress: orderData.deliveryAddress,
      total_price: orderData.totalPrice,
  
      // ОСЬ ТУТ САМА ВАЖЛИВА ЧАСТИНА:
      products: orderData.products.map((p) => ({
        product: Number(p.id), // Поле всередині компонента має називатися саме 'product'
        count: Number(p.count) // Поле всередині компонента має називатися саме 'count'
      })),
    },
  };

    setIsLoading(true);
    setError(null);

    try {
      const token = process.env.REACT_APP_API_TOKEN; 

      // 3. Відправляємо запит
      await axiosInstance.post(`api/orders`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      handleClearCart();
    } catch (err: any) {
      const errorMsg = err?.response?.data?.error?.message || err?.message || "An unexpected error occurred";
      setError(errorMsg);
      throw new Error(errorMsg);
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
