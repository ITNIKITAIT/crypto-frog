import { useAuth } from "lib/auth/admin/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminLayout from "lib/components/AdminLayout";
import { useEffect } from "react";
import Content from "./__Content";

const AdminAdvertisement = (): JSX.Element => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setToken(null);

      localStorage.removeItem("authToken");
      navigate("/xxxopernDyn5fYk/admin/login");
    }
  }, [token, navigate, setToken]);

  return (
    <AdminLayout title="Добавление баннера">{token && <Content />}</AdminLayout>
  );
};

AdminAdvertisement.displayName = "Advertisement";

export default AdminAdvertisement;
