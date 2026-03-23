import { Delivery } from "./delivery";
import { Payment } from "./payment";
import {
  Button,
  Currency,
  StrapiArrayResponse,
  StrapiResponse,
} from "./strapiRes";

export type TCart = {
  id: string;
  count: number;
};

export type TCarts = TCart[];

export interface CartView {
  title: string;
}

export interface CartOrderView {
  title: string;
  deliveryAddress_label: string;
  delivery: {
    title: string;
    deliveryAddress_label: string;
    deliveries: StrapiArrayResponse<Delivery>;
  };
  recipient: {
    title: string;
    firstName_label: string;
    lastName_label: string;
    middleName_label: string;
    phone_label: string;
  };
  payment: {
    title: string;
    payments: StrapiArrayResponse<Payment>;
  };
}

export interface Summary {
  price_label: string;
  deliveryPrice_label: string;
  fullPrice_label: string;
  section_title: string;
  pay_button: Button;
}

export interface CartAttributes {
  cart_view: CartView;
  cart_order_view: CartOrderView;
  summary: Summary;
  currency: StrapiResponse<Currency>;
  emptyCartText: string;
}

export type CartResponse = StrapiResponse<CartAttributes>;
