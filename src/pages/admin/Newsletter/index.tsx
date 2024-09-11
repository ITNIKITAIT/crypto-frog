import AdminLayout from "lib/components/AdminLayout";
import { useAuth } from "lib/auth/admin/AuthContext";
import { getApiAdminItemAllTotal } from "lib/endpoints/api/admin/item/all/total/get";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Newsletter from "./__Newsletter";

const AdminNewsletter = (): JSX.Element => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        // setIsLoading(true);
        const response = await getApiAdminItemAllTotal({ token });
        if (response.status === 401) {
          navigate("/xxxopernDyn5fYk/admin/login");
        }
      } catch (_error: unknown) {
        navigate("/xxxopernDyn5fYk/admin/login");
      }
    };

    fetchNewsletter();
  }, [token, navigate]);

  return (
    <AdminLayout title="Рассылка">
      {token && <Newsletter token={token} />}
    </AdminLayout>
  );
};

AdminNewsletter.displayName = "AdminNewsletter";

export default AdminNewsletter;
