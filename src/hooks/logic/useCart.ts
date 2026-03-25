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
    const submitOrder = async (orderData: CreateOrderPayload) => {
  setIsLoading(true);
  
  // Витягуємо тільки ID товарів
  const submitOrder = async (orderData: CreateOrderPayload) => {
  setIsLoading(true);
  setError(null);

  const productIds = orderData.products.map((p) => Number(p.id));

  const body = {
    data: {
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      phone: orderData.phone,
      email: orderData.email,
      deliveryAddress: orderData.deliveryAddress,
      
      // ВАЖЛИВО: Назви мають точно збігатися з помилками в логах
      price: Number(orderData.price),            // Була помилка: price must be defined
      delivery_price: Number(orderData.deliveryPrice), // Була помилка: delivery_price must be defined
      total_price: Number(orderData.totalPrice),
      
      order_products: productIds, 
    },
  };

  try {
    const response = await axiosInstance.post(`api/orders`, body);
    handleClearCart();
  } catch (err: any) {
    console.error("ДЕТАЛІ ПОМИЛКИ:", err.response?.data?.error?.details);
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
