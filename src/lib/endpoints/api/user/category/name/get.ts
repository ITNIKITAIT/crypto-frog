import type { AxiosResponse } from "axios";
import type { ProductProps } from "lib/product/types";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";

export const getApiUserCategoryByName = ({
  name,
}: {
  name: string;
}): Promise<AxiosResponse<ReadonlyArray<ProductProps>>> =>
  axios.get(`${BASE_URL}/api/user/category/name/${name}`);
