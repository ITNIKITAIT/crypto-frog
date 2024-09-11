import type { AxiosResponse } from "axios";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";

export const getApiAdminProfileAllTotal = ({
  token,
}: {
  token: null | string;
}): Promise<AxiosResponse<number>> =>
  axios.get(`${BASE_URL}/api/admin/profile/all/total`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
