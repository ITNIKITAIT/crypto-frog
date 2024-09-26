import AdminLayout from "lib/components/AdminLayout";
import { useAuth } from "lib/auth/admin/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import queryString from "query-string";
import { getApiAdminDiscountAll } from "lib/endpoints/api/admin/discount/all/get";
import axios, { AxiosError } from "axios";
import Content from "./__Content";
import { IProcomodeItem, PromocodeType } from "./types";

const AdminPromocodes = (): JSX.Element => {
  const { setToken } = useAuth();
  const { token } = useAuth();

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
  const initialType = queryParams.type
    ? (queryParams.type as PromocodeType)
    : "GENERAL";

  const reload = () => {};
  const [promocodes, setpromocodes] =
    useState<null | ReadonlyArray<IProcomodeItem>>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [type, setType] = useState<PromocodeType>(initialType);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | AxiosError>(null);

  useEffect(() => {
    if (!token) {
      setToken(null);

      localStorage.removeItem("authToken");
      navigate("/xxxopernDyn5fYk/admin/login");
    }
  }, [token, navigate, setToken]);

  const updateUrl = useCallback(
    (newPage: number, newLimit: number, newType: PromocodeType) => {
      navigate(`?page=${newPage}&limit=${newLimit}&type=${newType}`, {
        replace: true,
      });
    },
    [navigate],
  );

  const handlePage = useCallback(
    (newPage: number) => {
      setPage(newPage);
      updateUrl(newPage, limit, type);
    },
    [limit, type, updateUrl],
  );

  const handleLimit = useCallback(
    (newLimit: number) => {
      setLimit(newLimit);
      updateUrl(page, newLimit, type);
    },
    [page, type, updateUrl],
  );

  const handleType = useCallback(
    (newType: PromocodeType) => {
      setType(newType);
      updateUrl(page, limit, newType);
    },
    [page, limit, updateUrl],
  );

  useEffect(() => {
    const fetchPromocodes = async () => {
      try {
        const response = await getApiAdminDiscountAll({
          page,
          size: limit,
          token,
        });
        // Нету апи для всех промокодов
        const total = await getApiAdminDiscountAll({
          page: 0,
          size: 10000000,
          token,
        });
        setTotalPages(
          type === "GENERAL"
            ? total.data.length
            : total.data.filter(code => code.type === type).length,
        );
        setpromocodes(
          type === "GENERAL"
            ? response.data
            : response.data.filter(code => code.type === type),
        );
        setIsLoading(false);
      } catch (_error) {
        if (axios.isAxiosError(_error)) {
          setError(_error);
        }
        setIsLoading(false);
      }
    };
    fetchPromocodes();
  }, [token, limit, page, totalPages, type]);

  return (
    <AdminLayout title="Промокоды">
      {token && (
        <Content
          promocodes={promocodes}
          error={error}
          isLoading={isLoading}
          page={page}
          limit={limit}
          type={type}
          reload={reload}
          totalPages={totalPages}
          onPageChange={handlePage}
          onLimitChange={handleLimit}
          handleType={handleType}
        />
      )}
    </AdminLayout>
  );
};

AdminPromocodes.displayName = "AdminPromocodes";

export default AdminPromocodes;
