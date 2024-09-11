import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = ({ to }: { to: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Открыть ссылку в новой вкладке
    window.open(to, "_blank");
    // Переход на главную страницу
    navigate("/");
  }, [to, navigate]);

  return null; // Компонент ничего не рендерит
};

export default Redirect;
