import type { AddCategoryProps } from "lib/category/types";

import { ChangeEvent, useCallback, useState } from "react";
import { postApiAdminCategory } from "lib/endpoints/api/admin/category/post";
import { useAuth } from "lib/auth/admin/AuthContext";
import { useNotification } from "lib/notification";
import { AxiosError } from "axios";
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

const CreateNewCategoryModal = ({
  isModalOpen,
  onClose,
  onSuccess,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}): JSX.Element => {
  const { token } = useAuth();
  const [newCategory, setNewCategory] = useState<AddCategoryProps>({
    name: "",
    pinned: false,
  });
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setNotification } = useNotification();
  const navigate = useNavigate();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setNewCategory(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const response = await postApiAdminCategory({
          category: newCategory,
          token,
        });
        setIsLoading(false);
        if (response.status === 201) {
          // Сбросить значения формы после добавления товара
          setNewCategory({
            name: "",
            pinned: false,
          });
          onSuccess();
          onClose();
          setNotification({
            message: `Категория "${newCategory.name}" успешно добавлена`,
            type: "success",
          });
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setIsLoading(false);
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
      }
    },
    [newCategory, onClose, onSuccess, setNotification, token, navigate],
  );

  return (
    <Modal
      open={isModalOpen}
      title="Добавить новую категорию"
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
            Добавить
          </Button>
        </ButtonContainer>
      </Box>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </Modal>
  );
};

CreateNewCategoryModal.displayName = "Modal";

export default CreateNewCategoryModal;
