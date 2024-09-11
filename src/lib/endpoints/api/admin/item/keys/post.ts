import type { AxiosResponse } from "axios";
import axios from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const postApiAdminItemKeys = ({
  itemId,
  keys,
  token,
}: {
  itemId: number;
  keys: ReadonlyArray<string>;
  token: null | string;
}): Promise<AxiosResponse<void>> =>
  axios.post(
    `${BASE_URL}/api/admin/item/keys`,
    { itemId, keys },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
