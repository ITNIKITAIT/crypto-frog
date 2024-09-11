import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const getApiUserOrderDownload = ({
  id,
}: {
  id: string;
}): Promise<AxiosResponse<string>> =>
  axios.get(`${BASE_URL}/api/user/order/download/${id}`, {
    responseType: "blob",
  });
