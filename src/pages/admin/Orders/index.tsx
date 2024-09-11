import AdminLayout from "lib/components/AdminLayout";
import { useAuth } from "lib/auth/admin/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Outer from "./__Outer";

const AdminOrders = (): JSX.Element => {
  const { setToken } = useAuth();
  const { token } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setToken(null);

      localStorage.removeItem("authToken");
      navigate("/xxxopernDyn5fYk/admin/login");
    }
  }, [token, navigate, setToken]);
  return (
    <AdminLayout title="Заказы">{token && <Outer token={token} />}</AdminLayout>
  );
};

AdminOrders.displayName = "AdminOrders";

export default AdminOrders;
