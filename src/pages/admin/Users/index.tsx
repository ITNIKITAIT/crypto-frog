import { useAuth } from "lib/auth/admin/AuthContext";

import AdminLayout from "lib/components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Outer from "./__Outer";

const AdminUsers = (): JSX.Element => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/xxxopernDyn5fYk/admin/login");
    }
  }, [token, navigate]);
  return (
    <AdminLayout title="Пользователи">
      {token && <Outer token={token} />}
    </AdminLayout>
  );
};

AdminUsers.displayName = "AdminUsers";

export default AdminUsers;
