import axios, { type AxiosResponse } from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const postApiAdminItemKeysDereserve = ({
  itemId,
  order,
  quantity,
}: {
  itemId: number;
  order: string;
  quantity: number;
}): Promise<AxiosResponse<void>> =>
  axios.post(`${BASE_URL}/api/admin/item/keys/dereserve`, {
    itemId,
    order,
    quantity,
  });
