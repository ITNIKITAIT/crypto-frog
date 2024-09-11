import type { AxiosResponse } from "axios";
import type { ProductProps } from "lib/product/types";

import axios from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const putApiAdminItem = ({
  item,
  token,
}: {
  item: ProductProps;
  token: null | string;
}): Promise<AxiosResponse<void>> =>
  axios.put(`${BASE_URL}/api/admin/item`, item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
