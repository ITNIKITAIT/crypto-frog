import type { AxiosResponse } from "axios";
import type { ProductProps } from "lib/product/types";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";

export const getApiAdminItemAllPagination = ({
  token,
  page,
  limit,
}: {
  token: null | string;
  page: number;
  limit: number;
}): Promise<AxiosResponse<ReadonlyArray<ProductProps>>> =>
  axios.get(`${BASE_URL}/api/admin/item/all/pagination/${page}/${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
