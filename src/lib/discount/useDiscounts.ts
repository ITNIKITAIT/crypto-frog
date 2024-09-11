import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getApiAdminDiscountAll } from "lib/endpoints/api/admin/discount/all/get";
import type { DiscountProps } from "./types";

export const useDiscounts = () => {
  const [discounts, setDiscounts] =
    useState<null | ReadonlyArray<DiscountProps>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | AxiosError>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApiAdminDiscountAll();
        setDiscounts(response.data);
        setIsLoading(false);
      } catch (_error) {
        if (axios.isAxiosError(_error)) {
          setError(_error);
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { discounts, isLoading, error };
};
