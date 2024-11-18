import type { AxiosResponse } from "axios";
import axios from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const getExistingBanner = ({
  token,
}: {
  token: null | string;
}): Promise<AxiosResponse<boolean>> =>
  axios.get<boolean>(`${BASE_URL}/api/admin/banner/exists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
