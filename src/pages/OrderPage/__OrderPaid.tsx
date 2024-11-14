import {
  Container,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
// import { MONOBANK_CARD, CRYPTO_WALLET } from "cms/PaymentInfo";
import { getApiUserItemById } from "lib/endpoints/api/user/item/id/get";
import { getApiUserOrderPaid } from "lib/endpoints/api/user/order/paid/get";
import { OrderProps } from "lib/orders/types";
import numberToUah from "lib/price/numberToUah";
import numberToUsd from "lib/price/numberToUsd";
import { round } from "lib/utils/round";
import moment from "moment-timezone";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Typography from "lib/ui/Typography";
import { AxiosError } from "axios";
import DownloadOrderButton from "./__DownloadOrderButton";
import { getApiUserArchivedItemById } from "../../lib/endpoints/api/user/archived-item/id/get";

type ItemWithNamesMap = {
  [key: string]: {
    name: string;
    quantity: number;
  };
};

const OrderPaid = ({
  orderId,
  isOrderPaid,
}: {
  orderId: OrderProps;
  isOrderPaid: boolean;
}): JSX.Element => {
  const navigate = useNavigate();
  // const [isOrderPaid, setIsOrderPaid] = useState<boolean>(false); // Состояние для отслеживания статуса оплаты

  // const [timeLeft, setTimeLeft] = useState<number>();

  const [items, setItems] = useState<ItemWithNamesMap>({});
  const [isItemsLoading, setIsItemsLoading] = useState<boolean>(false);
  // const [showDownload, setShowDownload] = useState<boolean>(false);

  const serverTime = orderId?.date; // Время с сервера
  const localTime = moment.tz(serverTime, "Europe/Warsaw").local();
  const formattedDate = localTime.format("DD.MM.YYYY HH:mm:ss");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsItemsLoading(true);
        const parsedItems = JSON.parse(orderId?.items ?? "{}");
        const requests = Object.keys(parsedItems).map(async itemId => {
          let itemDetails;
          try {
            // Предполагается, что функция fetchItemDetails возвращает детали товара
            itemDetails = await getApiUserItemById({
              id: +itemId,
            });
          } catch (error) {
            if (error instanceof AxiosError) {
              if (error.response?.status === 404) {
                itemDetails = await getApiUserArchivedItemById({
                  id: +itemId,
                });
              }
            }
          }

          const itemQuantity = parsedItems[itemId];
          return {
            [itemId]: { name: itemDetails.data.name, quantity: itemQuantity },
          };
        });

        // Ожидание завершения всех запросов
        const results = await Promise.all(requests);
        // Объединение результатов в один объект
        const itemsMap = results.reduce(
          (acc, itemDetails) => ({ ...acc, ...itemDetails }),
          {},
        );
        setItems(itemsMap);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setItems({});
      } finally {
        setIsItemsLoading(false);
      }
    };

    fetchItems();
  }, [orderId?.items]);

  useEffect(() => {
    let interval; // Объявление переменной для интервала

    // Функция для проверки статуса оплаты
    const checkOrderStatus = () => {
      if (isOrderPaid) return; // Если заказ оплачен, то выходим из функции
      interval = setInterval(() => {
        getApiUserOrderPaid({ id: orderId.orderId })
          .then(response => {
            if (response.data) {
              // setIsOrderPaid(true);
              // setShowDownload(true);
              clearInterval(interval); // Остановка проверки, если заказ оплачен
            }
          })
          // eslint-disable-next-line no-console
          .catch(error => console.error("Ошибка при проверке оплаты: ", error));
      }, 5000);
    };

    checkOrderStatus(); // Запуск функции при наличии orderId

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, [isOrderPaid, orderId]);

  useEffect(() => {
    if (localTime) {
      // Добавляем 10 минут к времени создания заказа для определения времени окончания
      const endTime = moment(localTime).add(15, "minutes");

      const interval = setInterval(() => {
        // Получаем текущее время
        const currentTime = moment();
        // Рассчитываем разницу между временем окончания и текущим временем
        const timeRemaining = endTime.diff(currentTime);

        // Если заказ оплачен или оплата производится вручную, то останавливаем интервал и оставляем пользователя на странице
        if (orderId?.manual) {
          clearInterval(interval);
          // setShowDownload(true);
          return;
        }
        if (timeRemaining <= 0 && !isOrderPaid) {
          clearInterval(interval);
          navigate("/"); // Редирект на главную страницу
        } else {
          // setTimeLeft(timeRemaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
    return () => {};
  }, [navigate, localTime, isOrderPaid, orderId?.manual]);

  // const formatTimeLeft = time => {
  //   if (!time) return "00:00";
  //   const minutes = Math.floor(time / 60000);
  //   const seconds = Math.floor((time % 60000) / 1000);
  //   return `${minutes.toString().padStart(2, "0")}:${seconds
  //     .toString()
  //     .padStart(2, "0")}`;
  // };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: { xs: "center", sm: "flex-start" },
        flexDirection: "column",
        marginLeft: 0,
        gap: "32px",
      }}
      maxWidth="md"
    >
      <Typography
        component="h1"
        variant="title2"
      >
        {t("payment")} #{orderId?.orderId}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          backgroundColor: "transparent",
          width: "510px",
          borderBottom: "none",
        }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{t("nameoforder")}</TableCell>
              <TableCell>
                <Typography variant="body2">
                  {Object.entries(items).map(([key, value]) => (
                    <div key={key}>{value.name}</div>
                  ))}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t("quantity")}</TableCell>
              <TableCell>
                <Typography variant="body2">
                  {isItemsLoading ? (
                    <CircularProgress />
                  ) : (
                    <>
                      {Object.entries(items).map(([key, value]) => (
                        <div key={key}>
                          {value.quantity} {t("units")}
                        </div>
                      ))}
                    </>
                  )}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t("paymentdate")}</TableCell>
              <TableCell>
                <Typography variant="body2">{formattedDate}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t("price")}</TableCell>
              <TableCell>
                <Typography variant="body2">
                  {orderId && (
                    <>
                      {orderId.paymentMethod === "CRYPTO"
                        ? numberToUsd(round(orderId.totalPrice, 2))
                        : numberToUah(round(orderId.totalPrice, 2))}
                    </>
                  )}
                </Typography>
              </TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell
                colSpan={2}
                align="center"
              >
                {orderId?.paymentMethod === "MONOBANK" ? (
                  <>
                    Переведите на карту <b>{MONOBANK_CARD}</b> сумму, указанную
                    в заказе с точностью до центов!
                  </>
                ) : (
                  <>
                    Переведите на кошелек <b>{CRYPTO_WALLET}</b> сумму,
                    указанную в заказе с точностью до центов!
                  </>
                )}
              </TableCell>
            </TableRow> */}
            {/* <TableRow>
              <TableCell
                colSpan={2}
                align="center"
                sx={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                {isOrderPaid || orderId?.manual ? (
                  <Alert severity="success">Заказ оплачен</Alert>
                ) : (
                  <>
                    Перевод необходимо совершить в течение 10 минут с момента
                    создания заказа, иначе платёж не будет найден! <br />
                    КОМИССИЮ ЗА ПЕРЕВОД ОПЛАЧИВАЕТЕ ВЫ
                  </>
                )}
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
      <DownloadOrderButton orderId={orderId.orderId} />
    </Container>
  );
};

OrderPaid.displayName = "Content";

export default OrderPaid;
