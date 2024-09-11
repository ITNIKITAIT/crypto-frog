import { Box } from "@mui/material";
import { AxiosError } from "axios";
import { deleteApiAdminItem } from "lib/endpoints/api/admin/item/delete";
import { useNotification } from "lib/notification";
import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import Modal from "lib/ui/Modal";
import Typography from "lib/ui/Typography";
import { useCallback } from "react";
import style from "./__style.module.scss";

const DeleteProductModal = ({
  productId,
  productName,
  token,
  isModalOpen,
  onSuccess,
  onClose,
}: {
  productId: number;
  productName: string;
  token: null | string;
  isModalOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}): JSX.Element => {
  const { setNotification } = useNotification();

  const handleDelete = useCallback(async () => {
    try {
      const response = await deleteApiAdminItem({ id: productId, token });
      if (response.status === 200) {
        onSuccess();
        onClose();
        setNotification({
          message: `Товар "${productName}" успешно удален`,
          type: "success",
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setNotification({
          message: "Ошибка при удалении товара",
          type: "error",
        });
      }
    }
  }, [productId, token, onSuccess, onClose, setNotification, productName]);

  return (
    <Modal
      title="Удаление товара"
      open={isModalOpen}
      onClose={onClose}
    >
      <Box px={3}>
        <Typography variant="body2bold">
          Вы действительно хотите удалить товар {productName}?
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
            onClick={handleDelete}
          >
            Удалить
          </Button>
        </ButtonContainer>
      </Box>
    </Modal>
  );
};

DeleteProductModal.displayName = DeleteProductModal;

export default DeleteProductModal;
