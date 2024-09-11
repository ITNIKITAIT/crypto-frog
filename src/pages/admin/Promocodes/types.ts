export interface IProcomodeItem {
  id: number;
  name: string;
  discount: string;
  numberOfUses: number;
}
export type AddPromocodeProps = Omit<IProcomodeItem, "id">;
