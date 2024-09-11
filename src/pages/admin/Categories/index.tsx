import { useCategories } from "lib/category/useCategories";
import AdminLayout from "lib/components/AdminLayout";
import { useAuth } from "lib/auth/admin/AuthContext";
import { getApiAdminItemAllTotal } from "lib/endpoints/api/admin/item/all/total/get";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Content from "./__Content";

const AdminCategories = (): JSX.Element => {
  const { categories, isLoading, error, reload } = useCategories();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
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

    // Обновляем URL с новыми значениями параметров запроса
    fetchCategories();
  }, [token, navigate]);
  return (
    <AdminLayout title="Категории">
      {token && (
        <Content
          categories={categories}
          error={error}
          isLoading={isLoading}
          reload={reload}
        />
      )}
    </AdminLayout>
  );
};

AdminCategories.displayName = "AdminCategories";

export default AdminCategories;
