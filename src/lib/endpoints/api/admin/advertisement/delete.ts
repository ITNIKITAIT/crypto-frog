import type { AxiosResponse } from "axios";

import axios from "axios";

import { BASE_URL } from "lib/endpoints/const";

export const deleteApiAdminAdvertisement = ({
  token,
}: {
  token: null | string;
}): Promise<AxiosResponse<void>> =>
  axios.delete(`${BASE_URL}/api/admin/banner`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
