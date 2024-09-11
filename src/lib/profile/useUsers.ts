import type { AxiosError } from "axios";

import { useCallback, useEffect, useState } from "react";
import { getApiAdminProfileAll } from "lib/endpoints/api/admin/profile/all/get";
import axios from "axios";
import type { ProfileProps } from "./types";

export const useUsers = ({ token }: { token: string }) => {
  const [users, setUsers] = useState<null | ReadonlyArray<ProfileProps>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | AxiosError>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await getApiAdminProfileAll({ token });
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (_error) {
      if (axios.isAxiosError(_error)) {
        setError(_error);
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const reload = useCallback(() => fetchUsers(), [fetchUsers]);

  return { users, isLoading, error, reload };
};
