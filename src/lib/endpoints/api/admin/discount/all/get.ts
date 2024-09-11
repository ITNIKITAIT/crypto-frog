import type { AxiosResponse } from "axios";

import { BASE_URL } from "lib/endpoints/const";
import axios from "axios";
import type { DiscountProps } from "lib/discount/types";

export const getApiAdminDiscountAll = (): Promise<
  AxiosResponse<ReadonlyArray<DiscountProps>>
> => axios.get(`${BASE_URL}/api/admin/discount/all`);

// [
// 	{
// 		"id": 1,
// 		"userId": 3,
// 		"code": "TFEGPH6OXW",
// 		"amount": 10
// 	}
// ]
