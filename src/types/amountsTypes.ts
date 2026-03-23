import { Currency, StrapiResponse } from "./strapiRes";

export type Amounts = {
  id: number;
  amount_from: number;
  amount_to: number;
  title: string;
  currency: StrapiResponse<Currency>;
};
