// http://138.68.109.236:8080/api/user/order/paid/1c1cc756-435f-4d4a-8b11-822f358967a9

// Этот запрос отправлять, когда пользователь оплатил заказ и ждет его подтверждения
import axios, { type AxiosResponse } from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const getApiUserOrderPaid = ({
  id,
}: {
  id: string;
}): Promise<AxiosResponse<boolean>> =>
  axios.get(`${BASE_URL}/api/user/order/paid/${id}`);
