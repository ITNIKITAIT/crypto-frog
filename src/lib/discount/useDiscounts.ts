import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "lib/auth/admin/AuthContext";
import { getApiAdminDiscountAll } from "lib/endpoints/api/admin/discount/all/get";
import type { DiscountProps } from "./types";

export const useDiscounts = () => {
  const [discounts, setDiscounts] =
    useState<null | ReadonlyArray<DiscountProps>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | AxiosError>(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApiAdminDiscountAll({
          page: 0,
          size: 10,
          token,
        });
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
