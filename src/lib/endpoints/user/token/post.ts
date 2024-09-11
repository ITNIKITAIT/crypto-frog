import axios, { type AxiosResponse } from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const postUserToken = ({
  email,
  sessionId,
}: {
  email: string;
  sessionId: string;
}): Promise<AxiosResponse<string>> =>
  axios.post(
    `${BASE_URL}/user/token`,
    {
      email,
      sessionId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
