import type { AxiosResponse } from "axios";

import axios from "axios";
import type { CategoryProps } from "lib/category/types";
import { BASE_URL } from "lib/endpoints/const";

export const putApiAdminCategory = ({
  category,
  token,
}: {
  category: CategoryProps;
  token: null | string;
}): Promise<AxiosResponse<void>> => {
  if (!token) {
    throw new Error("Token is required for this request");
  }

  return axios.put(
    `${BASE_URL}/api/admin/category`,
    {
      ...category,
      pinned: category.pinned.toString(), // Преобразование в строку, если требуется
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
