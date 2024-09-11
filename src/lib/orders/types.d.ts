export type ItemsMap = {
  [key: number]: number;
};

export type PaymentMethod = "MONOBANK" | "CRYPTO";

export type OrderAddProps = {
  items: ItemsMap;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  userEmail: string;
  discountCode: string;
};

export type OrderProps = {
  orderId: string;
  date: string;
  items: string; // Parse to ItemsMap: "{\"1\":2}"
  totalPrice: number;
  paymentMethod: "MONOBANK" | "CRYPTO";
  userEmail: string;
  manual: boolean; // всегда false. Можно даже не передавать
  discountCode: null | string;
  payed: boolean;
};

export type OrderPutProps = {
  orderId: string;
  date: string;
  items: ItemsMap;
  totalPrice: number;
  paymentMethod: "MONOBANK" | "CRYPTO";
  userEmail: string;
  manual: boolean; // всегда false. Можно даже не передавать
  discountCode: null | string;
  payed: boolean;
};
