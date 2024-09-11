import type { AxiosResponse } from "axios";
import type { ProfileProps } from "lib/profile/types";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";

export const getApiAdminProfileAllPagination = ({
  page,
  limit,
  token,
}: {
  page: number;
  limit: number;
  token: string;
}): Promise<AxiosResponse<ReadonlyArray<ProfileProps>>> =>
  axios.get(`${BASE_URL}/api/admin/profile/all/pagination/${page}/${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
