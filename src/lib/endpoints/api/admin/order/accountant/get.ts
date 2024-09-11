import type { AxiosResponse } from "axios";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";
import type { AccountantItemProps } from "lib/accountant/types";

export const getApiAdminOrderAccountant = ({
  from, // 2023-09-18T05:11:24
  to,
  token,
}: {
  from: string;
  to: string;
  token: string;
}): Promise<AxiosResponse<ReadonlyArray<AccountantItemProps>>> =>
  axios.get(`${BASE_URL}/api/admin/order/accountant?from=${from}&to=${to}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
