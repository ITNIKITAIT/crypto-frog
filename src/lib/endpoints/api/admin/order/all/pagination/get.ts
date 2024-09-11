import type { AxiosResponse } from "axios";
import type { OrderProps } from "lib/orders/types";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";

export const getApiAdminOrderAllPagination = ({
  page,
  limit,
  token,
}: {
  page: number;
  limit: number;
  token: null | string;
}): Promise<AxiosResponse<ReadonlyArray<OrderProps>>> =>
  axios.get(`${BASE_URL}/api/admin/order/all/pagination/${page}/${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
