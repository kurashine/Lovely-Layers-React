import { useLocalStorage } from "usehooks-ts";
import { useCallback, useState } from "react";
import { TCarts } from "../../types/carts";
import axiosInstance from "../../utils/axios";

interface OrderProduct {
  id: number | string;
  count: number;
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

  // ВИПРАВЛЕНА ФУНКЦІЯ SUBMIT ORDER
  const submitOrder = async (orderData: CreateOrderPayload) => {
    setIsLoading(true);
    setError(null);

    const body = {
      data: {
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        middleName: orderData.middleName || "",
        phone: orderData.phone,
        email: orderData.email,
        deliveryAddress: orderData.deliveryAddress,
        price: Number(orderData.price),
        delivery_price: Number(orderData.deliveryPrice),
        total_price: Number(orderData.totalPrice),
        
        // ПРАВИЛЬНИЙ ФОРМАТ ДЛЯ RELATION:
        // Ми передаємо масив ID. Якщо просто [id, id] не працює, 
        // Strapi зрозуміє цей формат:
        order_products: {
          connect: orderData.products.map((p) => ({ id: Number(p.id) }))
        },
      },
    };

    try {
      await axiosInstance.post(`api/orders`, body);
      handleClearCart();
    } catch (err: any) {
      console.error("Order submission error:", err);
      setError(err?.response?.data?.error?.message || "Error submitting order");
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
