import { CircularProgress } from "@mui/material";
import type { AxiosError } from "axios";
import { Fragment, useEffect } from "react";
import { useAuth } from "lib/auth/admin/AuthContext";
import { useNavigate } from "react-router-dom";
import type { OrderProps } from "lib/orders/types";
import OrdersTable from "./OrdersTable";

const Content = ({
  orders,
  page,
  totalPages,
  limit,
  error,
  isLoading,
  onPageChange,
  onLimitChange,
}: {
  orders: null | ReadonlyArray<OrderProps>;
  page: number;
  totalPages: number;
  limit: number;
  error: AxiosError | null;
  isLoading: boolean;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
}): JSX.Element => {
  const { setToken } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (error !== null) {
      setToken(null);

      localStorage.removeItem("authToken");

      navigate("/xxxopernDyn5fYk/admin/login");
    }
  }, [navigate, error, setToken]);

  if (isLoading || orders === null) {
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
      <OrdersTable
        orders={orders}
        page={page}
        totalPages={totalPages}
        limit={limit}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </Fragment>
  );
};

Content.displayName = "Content";

export default Content;
