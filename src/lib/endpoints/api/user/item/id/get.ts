import type { AxiosResponse } from "axios";
import type { ProductProps } from "lib/product/types";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";

export const getApiUserItemById = ({
  id,
}: {
  id: number;
}): Promise<AxiosResponse<ProductProps>> =>
  axios.get(`${BASE_URL}/api/user/item/id/${id}`, {
    params: {
      telegramOnly: "false",
    },
  });
