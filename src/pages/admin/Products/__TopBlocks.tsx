import { Alert, Box, CircularProgress, Paper } from "@mui/material";
import Typography from "lib/ui/Typography";
import { useEffect, useState } from "react";
import { useAuth } from "lib/auth/admin/AuthContext";
import { getApiAdminItemPriceTotal } from "lib/endpoints/api/admin/item/price/total/get";
import { getApiAdminOrderTodayAmount } from "lib/endpoints/api/admin/order/today/amount/get";
import { getApiAdminOrderTodayQuantity } from "lib/endpoints/api/admin/order/today/quantity/get";
import { AxiosError } from "axios";
import { round } from "lib/utils/round";
import numberToUsd from "lib/price/numberToUsd";
import { getApiAdminItemAllTotal } from "lib/endpoints/api/admin/item/all/total/get";
import style from "./__style.module.scss";

const TopBlocks = (): JSX.Element => {
  const { token } = useAuth();
  const [productQuantity, setProductQuantity] = useState<null | number>(null);
  const [totalSum, setTotalSum] = useState<null | number>(null);
  const [totalPurchases, setTotalPurchases] = useState<null | number>(null);
  const [sellAmount, setSellAmount] = useState<null | number>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const productQuantityResponse = await getApiAdminItemAllTotal({
          token,
        });
        setProductQuantity(productQuantityResponse.data);

        const totalResponse = await getApiAdminItemPriceTotal({ token });
        setTotalSum(round(totalResponse.data, 2));

        const purchasesResponse = await getApiAdminOrderTodayQuantity({
          token,
        });
        setTotalPurchases(round(purchasesResponse.data, 2));

        const amountResponse = await getApiAdminOrderTodayAmount({ token });
        setSellAmount(round(amountResponse.data, 2));
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 401:
              setErrorMessage("Неверный логин или пароль");
              break;
            case 500:
              setErrorMessage("Не удалось загрузить блоки с общей информацией");
              break;
            default:
              setErrorMessage("Неизвестная ошибка");
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (errorMessage !== null) {
    return (
      <Alert
        severity="error"
        sx={{ maxWidth: 400 }}
      >
        {errorMessage}
      </Alert>
    );
  }

  const renderProductQuantity = () => {
    if (productQuantity) {
      return productQuantity;
    }
    return 0;
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
      mb={8}
    >
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography
          component="span"
          variant="title2"
        >
          {renderProductQuantity()}
        </Typography>
        <Typography
          variant="body2"
          className={style.p}
        >
          Всего товаров в магазине
        </Typography>
      </Paper>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography
          component="span"
          variant="title2"
        >
          {totalSum ? numberToUsd(round(totalSum, 2)) : 0}
        </Typography>
        <Typography
          variant="body2"
          className={style.p}
        >
          Всего товара на сумму
        </Typography>
      </Paper>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography
          component="span"
          variant="title2"
        >
          {totalPurchases}
        </Typography>
        <Typography
          variant="body2"
          className={style.p}
        >
          Покупки за сегодня
        </Typography>
      </Paper>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography
          component="span"
          variant="title2"
        >
          {sellAmount ? numberToUsd(round(sellAmount, 2)) : 0}
        </Typography>
        <Typography
          variant="body2"
          className={style.p}
        >
          Сумма продаж за день
        </Typography>
      </Paper>
    </Box>
  );
};

TopBlocks.displayName = "TopBlocks";

export default TopBlocks;
