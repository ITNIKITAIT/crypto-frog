import type { AxiosResponse } from "axios";

import axios from "axios";

import { BASE_URL } from "lib/endpoints/const";

export const postApiAdminAdvertisement = ({
  advertisement,
  token,
}: {
  advertisement: FormData;
  token: null | string;
}): Promise<AxiosResponse<void>> =>
  axios.post(`${BASE_URL}/api/admin/banner/upload`, advertisement, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
