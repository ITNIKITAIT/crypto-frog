import axios, { type AxiosResponse } from "axios";
import { BASE_URL } from "lib/endpoints/const";
import type { ItemsMap } from "lib/orders/types";

export const postApiAdminItemKeysReserve = ({
  items,
  order,
  token,
}: {
  items: ItemsMap;
  order: string;
  token: null | string;
}): Promise<AxiosResponse<void>> =>
  axios.post(
    `${BASE_URL}/api/admin/item/keys/reserve`,
    {
      items,
      order,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
