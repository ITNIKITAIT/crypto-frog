import { TableRow, TableCell, IconButton } from "@mui/material";
import type { ItemsMap, OrderProps } from "lib/orders/types";
import DownloadIcon from "@mui/icons-material/Download";
import { useCallback, useMemo, useState } from "react";
import { useNotification } from "lib/notification";
import { useAuth } from "lib/auth/admin/AuthContext";
import { AxiosError } from "axios";
import { getApiAdminOrderDownload } from "lib/endpoints/api/admin/order/download/get";
import { postApiAdminItemKeysReserve } from "lib/endpoints/api/admin/item/keys/reserve/post";
import { round } from "lib/utils/round";
import { putApiAdminOrder } from "lib/endpoints/api/admin/order/put";
import numberToUsd from "lib/price/numberToUsd";
import DownloadOrderModal from "./__DownloadOrderModal";

const downloadTextFile = (orderId: string, text: string) => {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `order-${orderId}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const OrderItem = ({ order }: { order: OrderProps }): JSX.Element => {
  const { token } = useAuth();
  const { setNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const [isOrderPayed, setIsOrderPayed] = useState<boolean>(
    order.payed || order.manual,
  );
  const [isOrderManual, setIsOrderManual] = useState<boolean>(order.manual);
  const parsedItems: ItemsMap = useMemo(() => {
    try {
      return JSON.parse(order.items);
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    }
  }, [order.items]);

  const handleDownloadSuccess = () => {
    setIsModalOpen(false);
    setIsOrderManual(true);
  };
  const handleDownload = useCallback(async () => {
    let errorOccurred = false;
    try {
      // Если заказ не оплачен, то резервируем ключи, иначе сразу скачиваем
      if (!isOrderPayed) {
        try {
          const reserveKeysResponse = await postApiAdminItemKeysReserve({
            items: parsedItems,
            order: order.orderId,
            token,
          });
          if (reserveKeysResponse.status === 200) {
            try {
              await putApiAdminOrder({
                order: {
                  ...order,
                  items: parsedItems,
                  manual: true,
                },
                token,
              });
            } catch (error: unknown) {
              if (error instanceof AxiosError) {
                setNotification({
                  message: "Ошибка при обновлении статуса товара",
                  type: "error",
                });
                errorOccurred = true;
              }
            }
            setIsOrderManual(true);
            setIsOrderPayed(true);
          }
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            let errorMessage = "Ошибка при резервации ключей";
            if (error.response?.status === 404) {
              errorMessage = "Похоже товар связанный с этим заказом был удален";
            } else if (error.response?.status === 400) {
              errorMessage = "Не хватает нужного количества ключей для выдачи";
            }
            setNotification({
              message: errorMessage,
              type: "error",
            });
            errorOccurred = true;
          }
        }
      }
      if (!errorOccurred) {
        const response = await getApiAdminOrderDownload({
          orderId: order.orderId,
          token,
        });
        downloadTextFile(order.orderId, response.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setNotification({
          message:
            "Ошибка при скачивании заказа. Похоже товар связанный с этим заказом был удален",
          type: "error",
        });
      }
    }
  }, [isOrderPayed, order, parsedItems, setNotification, token]);

  const formattedDate = useMemo(
    () =>
      new Date(order.date).toLocaleDateString("uk-UA", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    [order.date],
  );

  return (
    <TableRow>
      <TableCell size="small">{order.orderId}</TableCell>
      <TableCell size="small">{formattedDate}</TableCell>
      <TableCell size="small">
        {parsedItems &&
          Object.entries(parsedItems).map(([key, value]) => (
            <div key={key}>
              ID: {key} | Кол-во: {value}
            </div>
          ))}
      </TableCell>
      <TableCell size="small">
        {numberToUsd(round(order.totalPrice, 2))}
      </TableCell>
      <TableCell size="small">{order.userEmail}</TableCell>
      <TableCell size="small">{order.paymentMethod}</TableCell>
      {isOrderManual ? (
        <TableCell size="small">Выдал админ</TableCell>
      ) : (
        <TableCell
          size="small"
          sx={{
            color: isOrderPayed ? "#4caf50" : "#ef5350",
          }}
        >
          {isOrderPayed ? "Оплачен" : "Не оплачен"}
        </TableCell>
      )}
      <TableCell size="small">
        <IconButton
          aria-label="Скачать заказ"
          onClick={
            order.payed || order.manual ? handleDownload : handleModalOpen
          }
        >
          <DownloadIcon />
        </IconButton>

        <DownloadOrderModal
          order={order}
          isModalOpen={isModalOpen}
          onSuccess={handleDownloadSuccess}
          onClose={handleModalClose}
        />
      </TableCell>
    </TableRow>
  );
};

OrderItem.displayName = "OrderItem";

export default OrderItem;
