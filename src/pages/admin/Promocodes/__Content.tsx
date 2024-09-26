import { AxiosError } from "axios";
import { Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import type { CategoryProps } from "lib/category/types";
import { Fragment, useEffect } from "react";
import { useAuth } from "lib/auth/admin/AuthContext";
import PromocodeTable from "./__PromocodesTable";
import { IProcomodeItem, PromocodeType } from "./types";
import CreateNewPromocode from "./__CreateNewPromocode";

const Content = ({
  promocodes,
  reload,
  page,
  totalPages,
  limit,
  error,
  isLoading,
  type,
  onPageChange,
  onLimitChange,
  handleType,
}: {
  promocodes: null | ReadonlyArray<IProcomodeItem>;
  reload: () => void;
  page: number;
  totalPages: number;
  limit: number;
  type: PromocodeType;
  error: AxiosError | null;
  isLoading: boolean;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  handleType: (newType: PromocodeType) => void;
}): JSX.Element => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    if (error !== null) {
      setToken(null);
      localStorage.removeItem("authToken");
      navigate("/xxxopernDyn5fYk/admin/login");
    }
  }, [error, navigate, setToken]);

  if (isLoading || promocodes === null) {
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
      <CreateNewPromocode
        reload={reload}
        type={type}
        handleType={handleType}
      />
      {promocodes && promocodes.length !== 0 ? (
        <PromocodeTable
          promocodes={promocodes}
          reload={reload}
          page={page}
          totalPages={totalPages}
          limit={limit}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
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
          Промокодов еще нет
        </Alert>
      )}
    </Fragment>
  );
};

Content.displayName = "Content";

export default Content;
