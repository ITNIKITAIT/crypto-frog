import axios, { type AxiosResponse } from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const getApiAdminItemKeysDownload = ({
  itemId,
  quantity,
  token,
}: {
  itemId: number;
  quantity: number;
  token: null | string;
}): Promise<AxiosResponse<string>> =>
  axios.get(
    `${BASE_URL}/api/admin/item/keys/download/${itemId}/number/${quantity}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
