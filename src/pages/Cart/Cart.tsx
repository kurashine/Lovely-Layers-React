import React, { useCallback, useMemo, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./Cart.css";
import { useCartPageData } from "../../hooks/api/useCartPageData";
import { useCart } from "../../hooks/logic/useCart";
import { useProductsByIds } from "../../hooks/api/useProductsByIds";
import Button from "../../components/Buttons";
import { Summary } from "../../types/carts";
import ProductList from "./ProductList/ProductList";

const Cart: React.FC = () => {
  const [showCartOrderPage, setShowCartOrderPage] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<number>();
  const [selectedDelivery, setSelectedDelivery] = useState<number>();
  const [recipientInfo, setRecipientInfo] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    phone: "",
    deliveryAddress: "",
  });

  const {
    handleUpdateOrRemoveProduct,
    products: cartProducts,
    submitOrder,
  } = useCart();

  const ids = useMemo(() => cartProducts.map(({ id }) => id), [cartProducts]);

  const { data: cartPageData } = useCartPageData();
  const { data: products } = useProductsByIds(ids);

  const calculateTotals = useCallback(() => {
    if (!products || !cartProducts.length)
      return { total: 0, delivery: 10, fullTotal: 0 };

    const total = cartProducts.reduce((sum, cartProduct) => {
      const product = products.find(({ id }) => String(id) === cartProduct.id);
      return (
        sum +
        (product ? Number(product.attributes.price) * cartProduct.count : 0)
      );
    }, 0);

    const delivery = 10; // Example delivery cost, replace with dynamic calculation if necessary
    const fullTotal = total + delivery;

    return { total, delivery, fullTotal };
  }, [products, cartProducts]);

  const canPlaceOrder = useCallback(() => {
    // Проверяем, выбраны ли доставка и оплата
    if (!selectedPayment || !selectedDelivery) return false;

    // Проверяем, заполнены ли все обязательные поля получателя
    const requiredRecipientFields = [
      "lastName",
      "firstName",
      "phone",
      "deliveryAddress",
    ];

    for (const field of requiredRecipientFields) {
      if (!recipientInfo[field as keyof typeof recipientInfo]) {
        return false;
      }
    }

    // Проверяем, есть ли товары в корзине
    if (!cartProducts.length) return false;

    return true;
  }, [selectedPayment, selectedDelivery, recipientInfo, cartProducts]);

  const { total, delivery, fullTotal } = calculateTotals();

  const handleOrder = useCallback(async () => {
    if (!showCartOrderPage) {
      setShowCartOrderPage(true);
      return;
    }

    // Проверка перед созданием заказа
    if (!canPlaceOrder()) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    // Подготовка данных для запроса
    const orderData = {
      firstName: recipientInfo.firstName,
      lastName: recipientInfo.lastName,
      middleName: recipientInfo.middleName || "",
      deliveryAddress: recipientInfo.deliveryAddress,
      deliveryId: selectedDelivery!,
      paymentId: selectedPayment!,
      products: cartProducts,
      price: total,
      deliveryPrice: delivery,
      totalPrice: fullTotal,
    };

    try {
      // Вызов функции создания заказа
      await submitOrder(orderData);

      alert("Замовлення успішно створено!");
      // Очистить корзину или выполнить другие действия
    } catch (error) {
      console.error("Ошибка при создании заказа:", error);
      alert("Виникла помилка при створенні замовлення. Спробуйте знову.");
    }
  }, [
    showCartOrderPage,
    canPlaceOrder,
    recipientInfo,
    selectedDelivery,
    selectedPayment,
    cartProducts,
    total,
    delivery,
    fullTotal,
    submitOrder,
  ]);

  const renderRecipientForm = useCallback(() => {
    if (!cartPageData) return null;

    const { recipient } = cartPageData.data.attributes.cart_order_view;

    return (
      <div className="cart__recipient-form">
        <h4 className="cart__sub-title">{recipient.title}</h4>
        <div className="cart__recipient-fields">
          <div className="cart__recipient-field">
            <label htmlFor="lastName">{recipient.lastName_label}</label>
            <input
              type="text"
              id="lastName"
              value={recipientInfo.lastName}
              onChange={(e) =>
                setRecipientInfo({ ...recipientInfo, lastName: e.target.value })
              }
            />
          </div>
          <div className="cart__recipient-field">
            <label htmlFor="firstName">{recipient.firstName_label}</label>
            <input
              type="text"
              id="firstName"
              value={recipientInfo.firstName}
              onChange={(e) =>
                setRecipientInfo({
                  ...recipientInfo,
                  firstName: e.target.value,
                })
              }
            />
          </div>
          <div className="cart__recipient-field">
            <label htmlFor="middleName">{recipient.middleName_label}</label>
            <input
              type="text"
              id="middleName"
              value={recipientInfo.middleName}
              onChange={(e) =>
                setRecipientInfo({
                  ...recipientInfo,
                  middleName: e.target.value,
                })
              }
            />
          </div>
          <div className="cart__recipient-field">
            <label htmlFor="phone">{recipient.phone_label}</label>
            <input
              type="text"
              id="phone"
              value={recipientInfo.phone}
              onChange={(e) =>
                setRecipientInfo({ ...recipientInfo, phone: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    );
  }, [cartPageData, recipientInfo]);

  const renderPaymentForm = useCallback(() => {
    if (!cartPageData) return null;

    const { payment } = cartPageData.data.attributes.cart_order_view;

    return (
      <div className="cart__payment-form">
        <h4 className="cart__sub-title">{payment.title}</h4>
        <div className="cart__payment-options">
          {payment.payments.data.map(
            ({ id, attributes: { label, description, type } }) => (
              <div
                key={id}
                id={`payment-${type}`}
                className={`cart__payment-option`}
                onClick={() => setSelectedPayment(id)}
              >
                <div
                  className={
                    selectedPayment === id
                      ? "cart__payment-option-selector cart__payment-option-selector_selected"
                      : "cart__payment-option-selector"
                  }
                />
                <label
                  htmlFor={`payment-${type} ${
                    selectedPayment === id
                      ? "cart__payment-option_selected"
                      : ""
                  }`}
                >
                  <strong>{label}</strong>
                  <span>{description}</span>
                </label>
              </div>
            )
          )}
        </div>
      </div>
    );
  }, [cartPageData, selectedPayment]);

  const renderDeliveryForm = useCallback(() => {
    if (!cartPageData) return null;

    const { delivery } = cartPageData.data.attributes.cart_order_view;

    return (
      <div className="cart__payment-form">
        <h4 className="cart__sub-title">{delivery.title}</h4>
        <div className="cart__payment-options">
          {delivery.deliveries.data.map(
            ({ id, attributes: { label, description, type } }) => (
              <div
                key={id}
                id={`delivery-${type}`}
                className={`cart__payment-option`}
                onClick={() => setSelectedDelivery(id)}
              >
                <div
                  className={
                    selectedDelivery === id
                      ? "cart__payment-option-selector cart__payment-option-selector_selected"
                      : "cart__payment-option-selector"
                  }
                />
                <label
                  htmlFor={`delivery-${type} ${
                    selectedDelivery === id
                      ? "cart__payment-option_selected"
                      : ""
                  }`}
                >
                  <strong>{label}</strong>
                  <span>{description ?? " "}</span>
                </label>
              </div>
            )
          )}
          <div className="cart__recipient-field">
            <label htmlFor="lastName">{delivery.deliveryAddress_label}</label>
            <input
              type="text"
              id="lastName"
              value={recipientInfo.deliveryAddress}
              onChange={(e) =>
                setRecipientInfo({
                  ...recipientInfo,
                  deliveryAddress: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    );
  }, [selectedDelivery, setSelectedDelivery, cartPageData, recipientInfo]);

  const renderSummary = useCallback(
    (summary: Summary, currencyName: string) => {
      return (
        <div className="cart__summary">
          <h4 className="cart__summary-title">{summary.section_title}</h4>
          <div className="cart__summary-item">
            <h6 className="cart__summary-item-title">{summary.price_label}</h6>
            <p className="cart__summary-item-text">
              {total}
              {currencyName}
            </p>
          </div>
          <div className="cart__summary-item">
            <h6 className="cart__summary-item-title">
              {summary.deliveryPrice_label}
            </h6>
            <p className="cart__summary-item-text">
              {delivery}
              {currencyName}
            </p>
          </div>
          <div className="cart__summary-line" />
          <div className="cart__summary-item">
            <h6 className="cart__summary-item-title">
              {summary.fullPrice_label}
            </h6>
            <p className="cart__summary-item-text">
              {fullTotal}
              {currencyName}
            </p>
          </div>
          <Button
            buttonProps={summary.pay_button}
            onClick={handleOrder}
            disabled={showCartOrderPage && !canPlaceOrder()}
          />
        </div>
      );
    },
    [total, delivery, fullTotal, handleOrder, canPlaceOrder, showCartOrderPage]
  );

  const renderContent = useCallback(() => {
    if (!cartPageData) {
      return null;
    }

    const { cart_order_view, summary, cart_view, currency } =
      cartPageData.data.attributes;

    const currencyName = currency?.data?.attributes?.name || "";

    if (showCartOrderPage) {
      return (
        <div>
          <h4 className="title cart__title">{cart_order_view.title}</h4>
          <div className="cart__hero">
            <div className="cart__products">
              {renderDeliveryForm()}
              {renderRecipientForm()}
              {renderPaymentForm()}
            </div>
            <div className="cart__summary-container">
              <div className="cart__summary-products">
                <ProductList
                  products={products}
                  cartProducts={cartProducts}
                  currencyName={currencyName}
                  handleUpdateOrRemoveProduct={handleUpdateOrRemoveProduct}
                  size="small"
                />
              </div>
              {renderSummary(summary, currencyName)}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h4 className="title cart__title">{cart_view.title}</h4>
        <div className="cart__hero">
          <div className="cart__products">
            <ProductList
              products={products}
              cartProducts={cartProducts}
              currencyName={currencyName}
              handleUpdateOrRemoveProduct={handleUpdateOrRemoveProduct}
              size="large"
            />
          </div>
          <div className="cart__summary-container">
            {renderSummary(summary, currencyName)}
          </div>
        </div>
      </div>
    );
  }, [
    cartPageData,
    products,
    renderDeliveryForm,
    cartProducts,
    showCartOrderPage,
    renderPaymentForm,
    handleUpdateOrRemoveProduct,
    renderSummary,
    renderRecipientForm,
  ]);

  if (!cartPageData) {
    return null;
  }

  const { emptyCartText } = cartPageData?.data.attributes;

  if (!products.length) {
    return (
      <Layout>
        <div className="containe cart__container cart__empty">
          <p className="cart__empty">{emptyCartText}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container cart__container">{renderContent()}</div>
    </Layout>
  );
};
export default Cart;
