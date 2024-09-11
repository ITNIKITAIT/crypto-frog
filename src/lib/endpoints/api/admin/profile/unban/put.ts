import type { AxiosResponse } from "axios";
import type { ProfileProps } from "lib/profile/types";

import axios from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const putApiAdminProfileUnban = ({
  profile,
  token,
}: {
  profile: ProfileProps;
  token: null | string;
}): Promise<AxiosResponse<void>> =>
  axios.put(`${BASE_URL}/api/admin/profile/unban`, profile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
