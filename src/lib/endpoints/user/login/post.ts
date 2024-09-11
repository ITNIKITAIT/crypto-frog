import axios, { type AxiosResponse } from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const postUserLogin = ({
  login,
  password,
}: {
  login: string;
  password: string;
}): Promise<AxiosResponse<string>> =>
  axios.post(
    `${BASE_URL}/user/login`,
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
