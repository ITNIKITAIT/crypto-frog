import { useEffect, useState } from "react";
import { getApiAdminOrderAll } from "lib/endpoints/api/admin/order/all/get";
import axios, { type AxiosError } from "axios";
import type { OrderProps } from "./types";

export const useOrders = ({ token }: { token: null | string }) => {
  const [orders, setOrders] = useState<null | ReadonlyArray<OrderProps>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | AxiosError>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApiAdminOrderAll({
          token,
        });
        setOrders(response.data);
        setIsLoading(false);
      } catch (_error) {
        if (axios.isAxiosError(_error)) {
          setError(_error);
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { orders, isLoading, error };
};
