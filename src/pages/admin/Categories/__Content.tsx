import { Alert, CircularProgress } from "@mui/material";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import type { CategoryProps } from "lib/category/types";
import { Fragment, useEffect } from "react";
import { useAuth } from "lib/auth/admin/AuthContext";
import CategoriesTable from "./__CategoriesTable";
import CreateNewCategory from "./__CreateNewCategory";

const Content = ({
  categories,
  error,
  isLoading,
  reload,
}: {
  categories: null | ReadonlyArray<CategoryProps>;
  error: AxiosError | null;
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

  if (isLoading || categories === null) {
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
      <CreateNewCategory reload={reload} />
      {categories && categories.length !== 0 ? (
        <CategoriesTable
          categories={categories}
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
          Категории еще не созданы
        </Alert>
      )}
    </Fragment>
  );
};

Content.displayName = "Content";

export default Content;
