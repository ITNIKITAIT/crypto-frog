import type { AxiosResponse } from "axios";
import type { ProductProps } from "lib/product/types";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";

export const getApiUserItemAll = (): Promise<
  AxiosResponse<ReadonlyArray<ProductProps>>
> =>
  axios.get(`${BASE_URL}/api/user/item/all`, {
    params: {
      telegramOnly: "false",
    },
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
