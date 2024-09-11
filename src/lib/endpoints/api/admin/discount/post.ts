import type { AxiosResponse } from "axios";

import axios from "axios";
import { BASE_URL } from "lib/endpoints/const";
import type { AddDiscountProps } from "lib/discount/types";

export const postApiAdminDiscount = ({
  discount,
  token,
}: {
  discount: AddDiscountProps;
  token: null | string;
}): Promise<AxiosResponse<void>> =>
  axios.post(`${BASE_URL}/api/admin/discount`, discount, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
