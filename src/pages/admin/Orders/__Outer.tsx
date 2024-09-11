import { getApiAdminOrderAllPagination } from "lib/endpoints/api/admin/order/all/pagination/get";
import axios, { type AxiosError } from "axios";
import type { OrderProps } from "lib/orders/types";
import { useState, useEffect, useCallback } from "react";
import { getApiAdminOrderAllTotal } from "lib/endpoints/api/admin/order/all/total/get";
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

  const [orders, setOrders] = useState<null | ReadonlyArray<OrderProps>>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | AxiosError>(null);

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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getApiAdminOrderAllPagination({
          page,
          limit,
          token,
        });

        const responseTotalPages = await getApiAdminOrderAllTotal({ token });
        setTotalPages(responseTotalPages.data);
        setOrders(response.data);
        setIsLoading(false);
      } catch (_error) {
        if (axios.isAxiosError(_error)) {
          setError(_error);
        }
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [page, limit, token]);

  return (
    <Content
      orders={orders}
      error={error}
      isLoading={isLoading}
      page={page}
      limit={limit}
      totalPages={totalPages}
      onPageChange={handlePage}
      onLimitChange={handleLimit}
    />
  );
};

Outer.displayName = "Outer";

export default Outer;
