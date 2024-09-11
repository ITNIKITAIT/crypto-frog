import type { AxiosResponse } from "axios";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";

export const getApiAdminItemAllTotal = ({
  token,
}: {
  token: null | string;
}): Promise<AxiosResponse<number>> =>
  axios.get(`${BASE_URL}/api/admin/item/all/total`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
