import axios, { type AxiosResponse } from "axios";
import { BASE_URL } from "lib/endpoints/const";
import type { OrderProps } from "lib/orders/types";

export const getApiUserOrderById = ({
  id,
}: {
  id: string;
}): Promise<AxiosResponse<OrderProps>> =>
  axios.get(`${BASE_URL}/api/user/order/${id}`);
