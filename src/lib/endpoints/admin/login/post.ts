import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "lib/endpoints/const";
import type { AdminSignInProps } from "lib/profile/types";

export const postAdminLogin = ({
  login,
  password,
}: {
  login: string;
  password: string;
}): Promise<AxiosResponse<AdminSignInProps>> =>
  axios.post(
    `${BASE_URL}/admin/login`,
    {
      login,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
