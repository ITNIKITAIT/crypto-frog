import axios, { type AxiosResponse } from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const getApiAdminOrderDownload = ({
  orderId,
  token,
}: {
  orderId: string;
  token: null | string;
}): Promise<AxiosResponse<string>> =>
  axios.get(`${BASE_URL}/api/admin/order/download/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
