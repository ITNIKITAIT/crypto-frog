import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const getApiAdminItemPriceTotal = ({
  token,
}: {
  token: null | string;
}): Promise<AxiosResponse<number>> =>
  axios.get(`${BASE_URL}/api/admin/item/price/total`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
