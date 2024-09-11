import { ChangeEvent, useCallback, useState } from "react";
// import { putApiAdminCategory } from "lib/endpoints/api/admin/category/put";
// import { useAuth } from "lib/auth/admin/AuthContext";
import { AxiosError } from "axios";
import { useNotification } from "lib/notification";
import { useNavigate } from "react-router-dom";

import { Alert, Box, Grid, TextField } from "@mui/material";
import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import Modal from "lib/ui/Modal";
import { AddPromocodeProps, IProcomodeItem } from "../types";

const EditPromocodeModal = ({
  promocode,
  isModalOpen,
  onClose,
  onSuccess,
}: {
  promocode: IProcomodeItem;
  isModalOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}): JSX.Element => {
  // const { token } = useAuth();
  const [newCategory, setNewCategory] = useState<AddPromocodeProps>({
    name: promocode.name,
    discount: promocode.discount,
    numberOfUses: promocode.numberOfUses,
  });
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setNotification } = useNotification();
  const navigate = useNavigate();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        // await putApiAdminCategory({
        //   category: {
        //     id: promocode.id,
        //     name: promocode.name,
        //     discount: promocode.discount,
        //     numberOfUses: promocode.numberOfUses
        //   },
        //   token,
        // });
        setIsLoading(true);
        // setNewCategory({
        //   name: "",
        //   pinned: false,
        // });
        onSuccess();
        onClose();
        setNotification({
          message: `Категория "${newCategory.name}" успешно обновлена`,
          type: "success",
        });
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 400:
              setErrorMessage("Такая категория уже существует");
              break;
            case 401:
              navigate("/xxxopernDyn5fYk/admin/login");
              break;
            case 500:
              setErrorMessage("Ошибка сервера");
              break;
            default:
              setErrorMessage("Неизвестная ошибка");
              break;
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, setNotification, onClose, onSuccess, newCategory.name],
  );

  return (
    <Modal
      open={isModalOpen}
      title="Редактировать промокод"
      onClose={onClose}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        p={2}
      >
        <Grid
          container
          spacing={3}
          mb={3}
        >
          <Grid
            item
            xs={12}
          >
            <TextField
              required
              fullWidth
              id="discount"
              label="Процент"
              name="discount"
              value={newCategory.discount}
              onChange={handleChange}
              autoFocus
            />
          </Grid>
        </Grid>
        <ButtonContainer>
          <Button
            isLoading={isLoading}
            type="submit"
          >
            Подтвердить
          </Button>
        </ButtonContainer>
      </Box>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </Modal>
  );
};

EditPromocodeModal.displayName = "EditPromocodeModal";

export default EditPromocodeModal;
