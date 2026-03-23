export interface Delivery {
  id: number;
  label: string;
  description?: string;
  price_text?: string;
  type: "department" | "courier";
}
