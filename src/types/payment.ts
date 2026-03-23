export interface Payment {
  id: number;
  type: "receiving" | "online";
  label: string;
  description?: string;
}
