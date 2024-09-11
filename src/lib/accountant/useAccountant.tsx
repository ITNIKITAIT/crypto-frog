import { useCallback, useEffect, useState } from "react";
import { getApiAdminOrderAccountant } from "lib/endpoints/api/admin/order/accountant/get";
import { AxiosError } from "axios";
import type { AccountantItemProps } from "./types";

export const useAccountant = ({
  from,
  to,
  token,
}: {
  from: string;
  to: string;
  token: string;
}) => {
  const [items, setItems] = useState<null | ReadonlyArray<AccountantItemProps>>(
    null,
  );
  const [error, setError] = useState<null | AxiosError>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAccountant = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getApiAdminOrderAccountant({ from, to, token });
      if (response.status === 200) {
        setItems([...response.data]);
      }
      if (response.status === 204) {
        setItems([]);
      }
    } catch (_error: unknown) {
      if (_error instanceof AxiosError) {
        setError(_error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [from, to, token]);

  useEffect(() => {
    fetchAccountant();
  }, [fetchAccountant]);

  const reload = useCallback(() => fetchAccountant(), [fetchAccountant]);

  return { items, error, isLoading, reload };
};
