import type { AxiosResponse } from "axios";

import axios from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const deleteApiAdminItem = ({
  id,
  token,
}: {
  id: number;
  token: null | string;
}): Promise<AxiosResponse<void>> =>
  axios.delete(`${BASE_URL}/api/admin/item/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
