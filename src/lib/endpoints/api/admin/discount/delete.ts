import type { AxiosResponse } from "axios";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";

export const deleteApiAdminDiscount = ({
  id,
  token,
}: {
  id: number;
  token: null | string;
}): Promise<AxiosResponse<void>> =>
  axios.delete(`${BASE_URL}/api/admin/discount/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
