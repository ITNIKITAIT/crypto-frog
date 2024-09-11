import type { AddCategoryProps, CategoryProps } from "lib/category/types";

import { ChangeEvent, useCallback, useState } from "react";
import { putApiAdminCategory } from "lib/endpoints/api/admin/category/put";
import { useAuth } from "lib/auth/admin/AuthContext";
import { AxiosError } from "axios";
import { useNotification } from "lib/notification";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import Modal from "lib/ui/Modal";

const EditCategoryModal = ({
  category,
  isModalOpen,
  onClose,
  onSuccess,
}: {
  category: CategoryProps;
  isModalOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}): JSX.Element => {
  const { token } = useAuth();
  const [newCategory, setNewCategory] = useState<AddCategoryProps>({
    name: category.name,
    pinned: category.pinned,
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
        await putApiAdminCategory({
          category: {
            id: category.id,
            name: newCategory.name,
            pinned: newCategory.pinned,
          },
          token,
        });
        setIsLoading(true);
        setNewCategory({
          name: "",
          pinned: false,
        });
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
    [
      category.id,
      newCategory.name,
      onClose,
      onSuccess,
      setNotification,
      token,
      navigate,
      newCategory.pinned,
    ],
  );

  return (
    <Modal
      open={isModalOpen}
      title="Редактировать категорию"
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
              id="name"
              label="Название"
              name="name"
              value={newCategory.name}
              onChange={handleChange}
              autoFocus
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={newCategory.pinned}
                  onChange={handleChange}
                  name="pinned"
                  color="primary"
                  style={{ color: "#A0F901" }}
                />
              }
              label="Закрепить на витрине"
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

EditCategoryModal.displayName = "EditCategoryModal";

export default EditCategoryModal;
