import { useAuth } from "lib/auth/admin/AuthContext";
import { useNavigate } from "react-router-dom";

import AdminLayout from "lib/components/AdminLayout";
import { useEffect } from "react";
import Content from "./__Content";

const AdminAccounting = (): JSX.Element => {
  const { token } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/xxxopernDyn5fYk/admin/login");
    }
  }, [token, navigate]);
  return (
    <AdminLayout title="Бухгалтерия">
      {token && <Content token={token} />}
    </AdminLayout>
  );
};

AdminAccounting.displayName = "AdminAccounting";

export default AdminAccounting;
