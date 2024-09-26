import type { AxiosResponse } from "axios";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";
import { IProcomodeItem } from "pages/admin/Promocodes/types";

// export const getApiAdminDiscountAll = (): Promise<
//   AxiosResponse<ReadonlyArray<DiscountProps>>
// > => axios.get(`${BASE_URL}/api/admin/discount/all`);

export const getApiAdminDiscountAll = ({
  page,
  size,
  token,
}: {
  page: number;
  size: number;
  token: null | string;
}): Promise<AxiosResponse<ReadonlyArray<IProcomodeItem>>> =>
  axios.get(`${BASE_URL}/api/admin/discount/all/pagination/${page}/${size}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getTest = ({
  token,
}: {
  token: null | string;
}): Promise<AxiosResponse<ReadonlyArray<IProcomodeItem>>> =>
  axios.get(`${BASE_URL}/api/admin/discount/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// [
// 	{
// 		"id": 1,
// 		"userId": 3,
// 		"code": "TFEGPH6OXW",
// 		"amount": 10
// 	}
// ]
