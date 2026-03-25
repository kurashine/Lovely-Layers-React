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
            ? { ...p, count: count ? count : p.count + 1 }
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
        setProducts(products.filter((p) => p.id !== productId));
        return;
      }
      const newProducts = products.map((p) =>
        p.id === productId ? { ...p, count: count || p.count } : p
      );
      setProducts(newProducts);
    },
    [products, setProducts]
  );

  const handleClearCart = useCallback(() => {
    setProducts([]);
  }, [setProducts]);

  const submitOrder = async (orderData: CreateOrderPayload) => {
    setIsLoading(true);
    setError(null);

    // Strapi REST API для Many-to-Many очікує просто масив ID чисел
    const productIds = orderData.products.map((p) => Number(p.id));

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
        
        // ВИПРАВЛЕНО: Відправляємо просто масив ID. 
        // Прибираємо { connect: ... }, бо REST API Strapi 4 
        // зазвичай не приймає таку структуру через звичайний POST.
        order_products: productIds, 
      },
    };

    console.log("SENDING FINAL BODY TO STRAPI:", body);

    try {
      const response = await axiosInstance.post(`api/orders`, body);
      console.log("SUCCESS RESPONSE:", response.data);
      handleClearCart();
    } catch (err: any) {
      console.error("ERROR FROM SERVER:", err.response?.data || err);
      setError(err?.response?.data?.error?.message || "Error");
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
