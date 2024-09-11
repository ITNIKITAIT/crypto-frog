import type { AxiosError } from "axios";
import type { ProfileProps } from "lib/profile/types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "lib/auth/admin/AuthContext";

import { CircularProgress } from "@mui/material";
import UsersTable from "./__UsersTable";

const Content = ({
  users,
  error,
  page,
  isLoading,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
  reload,
}: {
  users: null | ReadonlyArray<ProfileProps>;
  error: AxiosError | null;
  page: number;
  totalPages: number;
  limit: number;
  isLoading: boolean;
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

  if (isLoading || users === null) {
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
    <UsersTable
      users={users}
      page={page}
      totalPages={totalPages}
      limit={limit}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
      reload={reload}
    />
  );
};

Content.displayName = "Content";

export default Content;
