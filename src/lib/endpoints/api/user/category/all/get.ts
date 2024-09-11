import type { AxiosResponse } from "axios";
import type { CategoryProps } from "lib/category/types";

import axios from "axios";
import { BASE_URL } from "lib/endpoints/const";

export const getApiUserCategoryAll = (): Promise<
  AxiosResponse<ReadonlyArray<CategoryProps>>
> => axios.get(`${BASE_URL}/api/user/category/all`);
