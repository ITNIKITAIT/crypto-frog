// {
//     "orderId": "1c1cc756-435f-4d4a-8b11-822f358967a9",
//     "date": "2023-10-24T20:06:43",
//     "itemId": 3,
//     "itemName": "Bebebe 5",
//     "quantity": 2,
//     "totalPrice": 401.0,
//     "paymentMethod": "MONOBANK",
//     "userEmail": "tbgaripov@gmail.com",
//     "manual": false,
//     "discountCode": null,
//     "payed": true
//       }

import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "lib/endpoints/const";
import type { OrderProps, OrderPutProps } from "lib/orders/types";

// Return:
// {
// 	"orderId": "1c1cc756-435f-4d4a-8b11-822f358967a9",
// 	"date": "2023-10-24T20:06:43",
// 	"itemId": 3,
// 	"itemName": "Bebebe 5",
// 	"quantity": 2,
// 	"totalPrice": 401.0,
// 	"paymentMethod": "MONOBANK",
// 	"userEmail": "tbgaripov@gmail.com",
// 	"manual": false,
// 	"discountCode": null,
// 	"payed": true
// }
// Это не важно, можно просто проверять на статус 200

// ВАЖНО: Если админ вручную ставит payed: true -> ключи автоматически должны резервироваться в системе

/*
{
		"itemId": 3,
    "order": "1c1cc756-435f-4d4a-8b11-822f358967a9",
    "quantity": 2 
}

Примерно такой запрос должен так же отпраляться когда true

apiAdminItemKeysReserve
*/

export const putApiAdminOrder = ({
  order,
  token,
}: {
  order: OrderPutProps;
  token: null | string;
}): Promise<AxiosResponse<OrderProps>> =>
  axios.put(`${BASE_URL}/api/admin/order`, order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
