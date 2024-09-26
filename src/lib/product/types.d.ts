import type { SupportedMedia } from "lib/media/types";

export type ProductProps = {
  id: number;
  name: string;
  // Пользователю отображается только price
  country: null | string;
  media: SupportedMedia;
  price: number;
  buyPrice: number;
  quantity: number;
  categoryId: number;
  totalPrice: number;
  telegramOnly: boolean;
  shortDescription: string;
  detailedDescription: string;
  supplierContact: string;
};

export type AddProductProps = Omit<ProductProps, "id">;

// apiUserItemAll
// {
//   "id": 1,
//   "name": "Item 3",
//   "quantity": 120,
//   "categoryId": 1,
//   "totalPrice": 24060.0,
//   "price": 200.5,
//   "buyPrice": 0.0,
//   "description": "Hallo Servous!"
// },

export type ProductFilterProps = {
  uuid: string;
  label: string;
  value: string;
};

export type ProductSectionProductProps = {
  uuid: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  supplierContact: string;
  media: SupportedMedia;
  country: string | null;
  amount: number;
  price: string;
  unit: string;
};

export type ProductSectionProduct = {
  id: number;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  supplierContact: string;
  price: number;
  media: SupportedMedia;
  country: null | string;
  quantity: number;
};
export type ProductSectionProps = {
  categoryId: number;
  categoryName: string;
  products: ProductProps[];
  pinned?: boolean;
};
