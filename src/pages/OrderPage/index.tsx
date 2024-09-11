import { CircularProgress } from "@mui/material";
import { AxiosError } from "axios";
import Layout from "lib/components/Layout";
import { getApiUserOrderById } from "lib/endpoints/api/user/order/get";
import type { OrderProps } from "lib/orders/types";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Logo from "lib/ui/Logo";
import { useTranslation } from "react-i18next";
import Content from "./__Content";
import LanguageSwitch from "./__LanguageSwitch";
import style from "./__style.module.scss";

const OrderPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<null | OrderProps>(null);
  const navigate = useNavigate();

  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      if (!orderId) {
        return;
      }
      try {
        // setIsLoading(true);
        const response = await getApiUserOrderById({
          id: orderId,
        });
        setOrder(response.data);
        // setIsLoading(false);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          navigate("*");
        }
      }
    };
    if (!orderId) {
      navigate("/");
    }
    fetchData();
  }, [navigate, orderId, t]);

  // if (errorMessage) {
  //   return (
  //     <Layout hideLayout>
  //       <Alert severity="error">{errorMessage}</Alert>
  //     </Layout>
  //   );
  // }

  // if (!order) {
  //   return (
  //     <Layout hideLayout>
  //       <Alert severity="error">
  //         Не удалось загрузить заказ. Пожалуйста, связитесь с нами для решения
  //         проблемы
  //       </Alert>
  //     </Layout>
  //   );
  // }

  return (
    <Layout hideLayout>
      <div className={style["logo-language"]}>
        <Logo />
        <LanguageSwitch />
      </div>
      <Helmet>
        <title>{t("orderhelmet")}</title>
      </Helmet>
      {!order ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <Content order={order} />
      )}
    </Layout>
  );
};

OrderPage.displayName = "OrderPage";

export default OrderPage;
