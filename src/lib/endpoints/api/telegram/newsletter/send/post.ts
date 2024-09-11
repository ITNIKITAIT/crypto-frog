import axios, { type AxiosResponse } from "axios";
import { BASE_URL } from "lib/endpoints/const";

// Тип для тела запроса
type SendMessageProps = {
  message: string;
};

// Функция для отправки сообщения
export const postApiAdminTelegramNewsletterSend = ({
  message,
  token,
}: {
  message: SendMessageProps; // Изменено здесь
  token: string;
}): Promise<AxiosResponse<void>> =>
  axios.post(`${BASE_URL}/api/admin/telegram/newsletter/send`, message, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
