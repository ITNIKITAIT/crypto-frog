import { Box } from "@mui/material";
import { AxiosError } from "axios";
import { deleteApiAdminDiscount } from "lib/endpoints/api/admin/discount/delete";
import { useNotification } from "lib/notification";
import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import Modal from "lib/ui/Modal";
import Typography from "lib/ui/Typography";
import { useCallback } from "react";
import style from "./__style.module.scss";

const DeletePromocodeModal = ({
  promocodeId,
  promocodeName,
  token,
  isModalOpen,
  onSuccess,
  onClose,
}: {
  promocodeId: number;
  promocodeName: string;
  token: null | string;
  isModalOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}): JSX.Element => {
  const { setNotification } = useNotification();

  const handleDelete = useCallback(async () => {
    try {
      const response = await deleteApiAdminDiscount({ id: promocodeId, token });
      if (response.status === 200) {
        onSuccess();
        onClose();
        setNotification({
          message: `Промокод "${promocodeName}" успешно удален`,
          type: "success",
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setNotification({
          message: "Ошибка при удалении промокода",
          type: "error",
        });
      }
    }
  }, [promocodeId, token, onSuccess, onClose, setNotification, promocodeName]);

  return (
    <Modal
      title="Удаление промокода"
      open={isModalOpen}
      onClose={onClose}
    >
      <Box px={3}>
        <Typography variant="body2bold">
          Вы действительно хотите удалить промокод {promocodeName}?
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

DeletePromocodeModal.displayName = DeletePromocodeModal;

export default DeletePromocodeModal;
