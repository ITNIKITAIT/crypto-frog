import axios, { type AxiosResponse } from "axios";
import type { OrderAddProps, OrderProps } from "lib/orders/types";
import { BASE_URL } from "lib/endpoints/const";

export const postApiUserOrder = ({
  order,
}: {
  order: OrderAddProps;
}): Promise<AxiosResponse<OrderProps>> =>
  axios.post(`${BASE_URL}/api/user/order`, order);
