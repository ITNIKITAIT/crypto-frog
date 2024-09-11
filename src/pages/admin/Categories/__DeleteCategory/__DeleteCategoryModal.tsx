import { Box } from "@mui/material";
import { AxiosError } from "axios";
import { deleteApiAdminCategory } from "lib/endpoints/api/admin/category/delete";
import { useNotification } from "lib/notification";
import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import Modal from "lib/ui/Modal";
import Typography from "lib/ui/Typography";
import { useCallback } from "react";
import style from "./__style.module.scss";

const DeleteCategoryModal = ({
  categoryId,
  categoryName,
  token,
  isModalOpen,
  onSuccess,
  onClose,
}: {
  categoryId: number;
  categoryName: string;
  token: null | string;
  isModalOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}): JSX.Element => {
  const { setNotification } = useNotification();

  const handleDelete = useCallback(async () => {
    try {
      const response = await deleteApiAdminCategory({ id: categoryId, token });
      if (response.status === 200) {
        onSuccess();
        onClose();
        setNotification({
          message: `Категория "${categoryName}" успешно удалена`,
          type: "success",
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setNotification({
          message: "Ошибка при удалении категории",
          type: "error",
        });
      }
    }
  }, [categoryId, token, onSuccess, onClose, setNotification, categoryName]);

  return (
    <Modal
      title="Удаление категории"
      open={isModalOpen}
      onClose={onClose}
    >
      <Box px={3}>
        <Typography variant="body2bold">
          Вы действительно хотите удалить категорию {categoryName}?
        </Typography>
        <Typography variant="body2bold">
          Все товары из этой категории будут скрыты из магазина. Не забудьте
          изменить категорию у этих товаров!
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

DeleteCategoryModal.displayName = DeleteCategoryModal;

export default DeleteCategoryModal;
