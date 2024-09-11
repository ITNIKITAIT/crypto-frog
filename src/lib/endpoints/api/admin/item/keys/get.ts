import type { AxiosResponse } from "axios";
import axios from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const getApiAdminItemKeys = ({
  orderId,
  token,
}: {
  orderId: string;
  token: null | string;
}): Promise<AxiosResponse<string>> =>
  axios.post(`${BASE_URL}/api/admin/item/keys/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
