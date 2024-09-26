export type PromocodeType = "GENERAL" | "PERSONAL" | "ALL";

export interface IProcomodeItem {
  id: number;
  type: PromocodeType;
  userId: number;
  code: string;
  amount: number;
  usageCount: number;
}
export type AddPromocodeProps = Omit<IProcomodeItem, "id">;
export type UpdatePromocodeProps = { id: number; amount: number };
