import type { AxiosResponse } from "axios";

import axios from "axios";
import type { AddCategoryProps } from "lib/category/types";
import { BASE_URL } from "lib/endpoints/const";

export const postApiAdminCategory = ({
  category,
  token,
}: {
  category: AddCategoryProps;
  token: null | string;
}): Promise<AxiosResponse<void>> =>
  axios.post(`${BASE_URL}/api/admin/category`, category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
