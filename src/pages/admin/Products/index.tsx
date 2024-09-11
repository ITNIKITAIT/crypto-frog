import AdminLayout from "lib/components/AdminLayout";
import axios, { AxiosError } from "axios";
import type { ProductProps } from "lib/product/types";
import { useState, useCallback, useEffect } from "react";
import { getApiAdminItemAllPagination } from "lib/endpoints/api/admin/item/all/pagination/get";
import { getApiAdminItemAllTotal } from "lib/endpoints/api/admin/item/all/total/get";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import Content from "./__Content";
import { useAuth } from "../../../lib/auth/admin/AuthContext";

const AdminProducts = (): JSX.Element => {
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

  const [products, setProducts] = useState<null | ReadonlyArray<ProductProps>>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | AxiosError>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(initialLimit);
  const [limit, setLimit] = useState<number>(10);

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

  const fetchProducts = useCallback(async () => {
    try {
      const response = await getApiAdminItemAllPagination({
        token,
        page,
        limit,
      });

      const responseTotalPages = await getApiAdminItemAllTotal({ token });
      setTotalPages(responseTotalPages.data);
      setProducts(response.data);
      setIsLoading(false);
    } catch (_error) {
      if (axios.isAxiosError(_error)) {
        setError(_error);
      }
      setIsLoading(false);
    }
  }, [token, page, limit]);

  useEffect(() => {
    fetchProducts();
  }, [page, limit, fetchProducts]);

  const reload = useCallback(() => fetchProducts(), [fetchProducts]);

  return (
    <AdminLayout title="Товары">
      <Content
        products={products}
        error={error}
        isLoading={isLoading}
        page={page}
        limit={limit}
        totalPages={totalPages}
        onPageChange={handlePage}
        onLimitChange={handleLimit}
        reload={reload}
      />
    </AdminLayout>
  );
};

AdminProducts.displayName = "AdminProducts";

export default AdminProducts;
