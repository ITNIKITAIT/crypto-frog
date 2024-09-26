import type { AxiosResponse } from "axios";

import axios from "axios";
import { BASE_URL } from "lib/endpoints/const";
import { UpdatePromocodeProps } from "pages/admin/Promocodes/types";

export const updateApiAdminDiscount = ({
  discount,
  token,
}: {
  discount: UpdatePromocodeProps;
  token: null | string;
}): Promise<AxiosResponse<void>> =>
  axios.patch(
    `${BASE_URL}/api/admin/discount/${discount.id}?amount=${discount.amount}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
