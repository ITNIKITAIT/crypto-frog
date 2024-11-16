import type { AxiosResponse } from "axios";
import axios from "axios";
import { IBannerResponse } from "lib/advertisement/types";
import { BASE_URL } from "lib/endpoints/const";

export const getDesktopBanner = (): Promise<AxiosResponse<IBannerResponse>> =>
  axios.get<IBannerResponse>(`${BASE_URL}/api/user/banner`);

export const getMobileBanner = (): Promise<AxiosResponse<IBannerResponse>> =>
  axios.get<IBannerResponse>(`${BASE_URL}/api/user/banner/mobile`);
