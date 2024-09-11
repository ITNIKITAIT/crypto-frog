import type { AxiosResponse } from "axios";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";
import type { CategoryProps } from "lib/category/types";

export const getApiUserCategoryById = ({
  id,
}: {
  id: number;
}): Promise<AxiosResponse<CategoryProps>> =>
  axios.get(`${BASE_URL}/api/user/category/all/id/${id}`);
