import type { AxiosResponse } from "axios";
import type { ProfileCardProps } from "lib/profile/types";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";

export const getApiAdminProfileByEmail = ({
  email,
  token,
}: {
  email: string;
  token: null | string;
}): Promise<AxiosResponse<ProfileCardProps>> =>
  axios.get(`${BASE_URL}/api/admin/profile/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
