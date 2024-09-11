import { Box } from "@mui/material";
import { AxiosError } from "axios";
// import { deleteApiAdminCategory } from "lib/endpoints/api/admin/category/delete";
import { useNotification } from "lib/notification";
import type { ItemsMap, OrderProps } from "lib/orders/types";
import { useAuth } from "lib/auth/admin/AuthContext";
import { postApiAdminItemKeysReserve } from "lib/endpoints/api/admin/item/keys/reserve/post";
import { putApiAdminOrder } from "lib/endpoints/api/admin/order/put";
import { getApiAdminOrderDownload } from "lib/endpoints/api/admin/order/download/get";
import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import Modal from "lib/ui/Modal";
import Typography from "lib/ui/Typography";
import { useCallback, useState, useMemo } from "react";
import style from "./__style.module.scss";

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
const DownloadOrderModal = ({
  order,
  isModalOpen,
  onSuccess,
  onClose,
}: {
  order: OrderProps;
  isModalOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}): JSX.Element => {
  const { token } = useAuth();
  const { setNotification } = useNotification();
  const [isOrderPayed, setIsOrderPayed] = useState<boolean>(
    order.payed || order.manual,
  );
  // Состояние для отслеживания статуса оплаты
  // const [isOrderManual, setIsOrderManual] = useState<boolean>(order.manual);
  // Состояние для отслеживания статуса выдачи вручную
  const parsedItems: ItemsMap = useMemo(() => {
    try {
      return JSON.parse(order.items);
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    }
  }, [order.items]);

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
            // setIsOrderManual(true);
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
        onSuccess();
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
  }, [isOrderPayed, order, parsedItems, setNotification, token, onSuccess]);

  return (
    <Modal
      title="Скачивание заказа"
      open={isModalOpen}
      onClose={onClose}
    >
      <Box px={3}>
        <Typography variant="body2bold">
          Вы действительно хотите скачать заказ {order.orderId}?
        </Typography>
        <Typography variant="body2bold">
          При скачивании данного заказа клиент будет иметь возможность скачать
          этот заказ из формы оплаты!
        </Typography>
        <ButtonContainer align="between">
          <Button
            variant="secondary"
            onClick={onClose}
            className={style.cancel}
          >
            Отмена
          </Button>
          <Button
            variant="primary"
            onClick={handleDownload}
          >
            Скачать
          </Button>
        </ButtonContainer>
      </Box>
    </Modal>
  );
};

DownloadOrderModal.displayName = DownloadOrderModal;

export default DownloadOrderModal;
