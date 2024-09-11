import axios, { type AxiosError } from "axios";
import { useState, useCallback, useEffect } from "react";
import type { ProfileProps } from "lib/profile/types";
import { getApiAdminProfileAllPagination } from "lib/endpoints/api/admin/profile/all/pagination/get";
import { getApiAdminProfileAllTotal } from "lib/endpoints/api/admin/profile/all/total/get";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import Content from "./__Content";

const Outer = ({ token }: { token: string }): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  // Получение начальных значений из URL
  const queryParams = queryString.parse(location.search);
  const initialPage = queryParams.page
    ? parseInt(queryParams.page as string, 10)
    : 0;
  const initialLimit = queryParams.limit
    ? parseInt(queryParams.limit as string, 10)
    : 10;

  const [users, setUsers] = useState<null | ReadonlyArray<ProfileProps>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | AxiosError>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(initialLimit);

  const updateUrl = useCallback(
    (newPage: number, newLimit: number) => {
      navigate(`?page=${newPage}&limit=${newLimit}`, { replace: true });
    },
    [navigate],
  );

  const handlePage = useCallback(
    (newPage: number) => {
      setPage(newPage);
      updateUrl(newPage, limit);
    },
    [limit, updateUrl],
  );

  const handleLimit = useCallback(
    (newLimit: number) => {
      setLimit(newLimit);
      updateUrl(page, newLimit);
    },
    [page, updateUrl],
  );

  const fetchUsers = useCallback(async () => {
    try {
      const response = await getApiAdminProfileAllPagination({
        page,
        limit,
        token,
      });

      const responseTotalPages = await getApiAdminProfileAllTotal({ token });
      setTotalPages(responseTotalPages.data);
      setUsers(response.data);
      setIsLoading(false);
    } catch (_error) {
      if (axios.isAxiosError(_error)) {
        setError(_error);
      }
      setIsLoading(false);
    }
  }, [page, limit, token]);

  useEffect(() => {
    fetchUsers();
  }, [page, limit, token, fetchUsers]);

  const reload = useCallback(() => fetchUsers(), [fetchUsers]);

  return (
    <Content
      users={users}
      error={error}
      isLoading={isLoading}
      page={page}
      limit={limit}
      totalPages={totalPages}
      onPageChange={handlePage}
      onLimitChange={handleLimit}
      reload={reload}
    />
  );
};

Outer.displayName = "Outer";

export default Outer;
