import AdminLayout from "lib/components/AdminLayout";
import { useAuth } from "lib/auth/admin/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Content from "./__Content";

const AdminPromocodes = (): JSX.Element => {
  const { setToken } = useAuth();
  const { token } = useAuth();

  const promocodes = [
    { id: 1, name: "promocode1", discount: "15", numberOfUses: 100 },
    { id: 2, name: "promocode2", discount: "5", numberOfUses: 50 },
    { id: 3, name: "promocode3", discount: "99", numberOfUses: 1 },
  ];
  const reload = () => {};
  const error = null;
  const isLoading = false;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setToken(null);

      localStorage.removeItem("authToken");
      navigate("/xxxopernDyn5fYk/admin/login");
    }
  }, [token, navigate, setToken]);
  return (
    <AdminLayout title="Промокоды">
      {token && (
        <Content
          promocodes={promocodes}
          error={error}
          isLoading={isLoading}
          reload={reload}
        />
      )}
    </AdminLayout>
  );
};

AdminPromocodes.displayName = "AdminPromocodes";

export default AdminPromocodes;
