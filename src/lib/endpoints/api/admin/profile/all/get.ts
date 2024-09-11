import type { AxiosResponse } from "axios";
import type { ProfileProps } from "lib/profile/types";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";

export const getApiAdminProfileAll = ({
  token,
}: {
  token: string;
}): Promise<AxiosResponse<ReadonlyArray<ProfileProps>>> =>
  axios.get(`${BASE_URL}/api/admin/profile/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
