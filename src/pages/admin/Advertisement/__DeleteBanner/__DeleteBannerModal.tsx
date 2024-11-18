import { Box } from "@mui/material";
import { AxiosError } from "axios";
import { useNotification } from "lib/notification";
import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import Modal from "lib/ui/Modal";
import Typography from "lib/ui/Typography";
import { useCallback } from "react";
import { deleteApiAdminAdvertisement } from "lib/endpoints/api/admin/advertisement/delete";
import style from "./__style.module.scss";

const DeleteBannerModal = ({
  token,
  isModalOpen,
  onSuccess,
  onClose,
}: {
  token: null | string;
  isModalOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}): JSX.Element => {
  const { setNotification } = useNotification();

  const handleDelete = useCallback(async () => {
    try {
      const response = await deleteApiAdminAdvertisement({ token });
      if (response.status === 204) {
        onSuccess();
        onClose();
        setNotification({
          message: `Баннер успешно удален`,
          type: "success",
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setNotification({
          message: "Ошибка при удалении баннера",
          type: "error",
        });
      }
    }
  }, [token, onSuccess, onClose, setNotification]);

  return (
    <Modal
      title="Удаление баннера"
      open={isModalOpen}
      onClose={onClose}
    >
      <Box px={3}>
        <Typography variant="body2bold">
          Вы действительно хотите удалить текущий баннер?
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

DeleteBannerModal.displayName = DeleteBannerModal;

export default DeleteBannerModal;
