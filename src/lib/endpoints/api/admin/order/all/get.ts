import type { AxiosResponse } from "axios";
import type { OrderProps } from "lib/orders/types";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";

export const getApiAdminOrderAll = ({
  token,
}: {
  token: null | string;
}): Promise<AxiosResponse<ReadonlyArray<OrderProps>>> =>
  axios.get(`${BASE_URL}/api/admin/order/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
