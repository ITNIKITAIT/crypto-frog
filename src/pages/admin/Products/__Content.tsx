import { Alert, CircularProgress } from "@mui/material";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import type { ProductProps } from "lib/product/types";
import { Fragment, useEffect } from "react";
import { useAuth } from "lib/auth/admin/AuthContext";

import CreateNewProduct from "./__CreateNewProduct";
import ProductsTable from "./__ProductsTable";
import TopBlocks from "./__TopBlocks";

const Content = ({
  products,
  error,
  isLoading,
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
  reload,
}: {
  products: null | ReadonlyArray<ProductProps>;
  error: AxiosError | null;
  isLoading: boolean;
  page: number;
  totalPages: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  reload: () => void;
}): JSX.Element => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  useEffect(() => {
    if (error !== null) {
      setToken(null);
      localStorage.removeItem("authToken");
      navigate("/xxxopernDyn5fYk/admin/login");
    }
  }, [navigate, error, setToken]);

  if (isLoading || products === null) {
    return (
      <CircularProgress
        color="secondary"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }
  return (
    <Fragment>
      <TopBlocks />
      <CreateNewProduct reload={reload} />
      {products && products.length !== 0 ? (
        <ProductsTable
          products={products}
          page={page}
          totalPages={totalPages}
          limit={limit}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
          reload={reload}
        />
      ) : (
        <Alert
          severity="info"
          sx={{
            mt: 2,
            width: 220,
            marginX: "auto",
          }}
        >
          Товары еще не созданы
        </Alert>
      )}
    </Fragment>
  );
};

Content.displayName = "Content";

export default Content;
