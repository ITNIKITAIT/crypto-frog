import type { AxiosResponse } from "axios";
import type { AddProductProps } from "lib/product/types";

import axios from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const postApiAdminItem = ({
  item,
  token,
}: {
  item: AddProductProps;
  token: null | string;
}): Promise<AxiosResponse<void>> =>
  axios.post(`${BASE_URL}/api/admin/item`, item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
