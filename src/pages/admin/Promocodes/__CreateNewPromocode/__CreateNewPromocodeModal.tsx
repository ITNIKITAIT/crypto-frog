import { ChangeEvent, useCallback, useState } from "react";
import { useAuth } from "lib/auth/admin/AuthContext";
import { useNotification } from "lib/notification";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Grid, TextField } from "@mui/material";
import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import Modal from "lib/ui/Modal";
import { AddDiscountProps } from "lib/discount/types";
import { postApiAdminDiscount } from "lib/endpoints/api/admin/discount/post";
import { validateAmount, validateCode } from "./validationPromocode";

const CreateNewPromocodeModal = ({
  isModalOpen,
  onClose,
  onSuccess,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}): JSX.Element => {
  const { token } = useAuth();
  const [newPromocode, setNewPromocode] = useState<AddDiscountProps>({
    code: "",
    amount: 5,
  });
  const [codeError, setCodeError] = useState<null | string>(null);
  const [amountError, setAmountError] = useState<null | string>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setNotification } = useNotification();
  const navigate = useNavigate();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "amount" && (!/^\d*$/.test(value) || value.length > 2)) {
      return;
    }
    if (name === "code") setCodeError(validateCode(value));
    if (name === "amount") setAmountError(validateAmount(Number(value)));

    setNewPromocode(prevState => ({
      ...prevState,
      [name]: name === "amount" ? Number(value) : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (amountError || codeError) return;
      try {
        setIsLoading(true);
        const response = await postApiAdminDiscount({
          discount: newPromocode,
          token,
        });

        setIsLoading(false);
        if (response.status === 201) {
          // Сбросить значения формы после добавления товара
          setNewPromocode({
            code: "",
            amount: 5,
          });
          onSuccess();
          onClose();
          setNotification({
            message: `Промокод "${newPromocode.code}" успешно добавлен`,
            type: "success",
          });
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setIsLoading(false);
          switch (error.response?.status) {
            case 400:
              setErrorMessage("Ошибка при создани промокода");
              break;
            case 401:
              navigate("/xxxopernDyn5fYk/admin/login");
              break;
            case 409:
              setErrorMessage("Такой промокод уже существует");
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
    [
      newPromocode,
      onClose,
      onSuccess,
      setNotification,
      token,
      navigate,
      amountError,
      codeError,
    ],
  );

  return (
    <Modal
      open={isModalOpen}
      title="Добавить новый прококод"
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
            mb={1}
          >
            <TextField
              required
              fullWidth
              id="code"
              label="Название"
              name="code"
              value={newPromocode.code}
              onChange={handleChange}
              autoFocus
            />
            {codeError && (
              <div
                style={{
                  color: "red",
                  fontSize: "14px",
                  position: "absolute",
                }}
              >
                {codeError}
              </div>
            )}
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              required
              fullWidth
              id="amount"
              label="Процент"
              name="amount"
              value={newPromocode.amount}
              onChange={handleChange}
              autoFocus
            />
            {amountError && (
              <div
                style={{
                  color: "red",
                  fontSize: "14px",
                  position: "absolute",
                }}
              >
                {amountError}
              </div>
            )}
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

CreateNewPromocodeModal.displayName = "Modal";

export default CreateNewPromocodeModal;
