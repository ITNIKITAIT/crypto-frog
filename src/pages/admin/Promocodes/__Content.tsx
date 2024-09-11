import { Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import type { CategoryProps } from "lib/category/types";
import { Fragment, useEffect } from "react";
import { useAuth } from "lib/auth/admin/AuthContext";
import PromocodeTable from "./__PromocodesTable";
import { IProcomodeItem } from "./types";

const Content = ({
  promocodes,
  error,
  isLoading,
  reload,
}: {
  promocodes: null | ReadonlyArray<IProcomodeItem>;
  error: boolean | null;
  isLoading: boolean;
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
      {promocodes && promocodes.length !== 0 ? (
        <PromocodeTable
          promocodes={promocodes}
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
          Промокодов еще нет
        </Alert>
      )}
    </Fragment>
  );
};

Content.displayName = "Content";

export default Content;
