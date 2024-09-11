import { useAuth } from "lib/auth/admin/AuthContext";
import Button from "lib/ui/Button";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import style from "../__style.module.scss";

const Logout = (): JSX.Element => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback((): void => {
    // 1. Удалить токен из контекста
    setToken(null);

    // 2. Удалить токен из localStorage
    localStorage.removeItem("authToken");

    // 3. Перенаправить пользователя на страницу входа
    navigate("/xxxopernDyn5fYk/admin/login");
  }, [navigate, setToken]);

  return (
    <Button
      onClick={handleLogout}
      variant="secondary"
      className={style.logout}
    >
      Выйти
    </Button>
  );
};

Logout.displayName = "Admin_Logout";

export default Logout;
