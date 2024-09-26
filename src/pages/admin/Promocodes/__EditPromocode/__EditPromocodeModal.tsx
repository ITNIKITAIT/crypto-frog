import { ChangeEvent, useCallback, useState } from "react";
import { AxiosError } from "axios";
import { useNotification } from "lib/notification";
import { useNavigate } from "react-router-dom";

import { useAuth } from "lib/auth/admin/AuthContext";
import { Alert, Box, Grid, TextField } from "@mui/material";
import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import { updateApiAdminDiscount } from "lib/endpoints/api/admin/discount/patch";
import Modal from "lib/ui/Modal";
import { IProcomodeItem } from "../types";
import { validateAmount } from "../__CreateNewPromocode/validationPromocode";

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
  const { token } = useAuth();
  const [newPromocode, setNewPromocode] = useState<{ amount: number }>({
    amount: promocode.amount,
  });
  const [amountError, setAmountError] = useState<null | string>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setNotification } = useNotification();
  const navigate = useNavigate();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    if (!/^\d*$/.test(amount) || amount.length > 2) {
      return;
    }
    setAmountError(validateAmount(Number(amount)));

    setNewPromocode({ amount: Number(amount) });
  }, []);

  const handleSubmit = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await updateApiAdminDiscount({
          discount: {
            id: promocode.id,
            amount: newPromocode.amount,
          },
          token,
        });
        setIsLoading(true);
        setNewPromocode({
          amount: 1,
        });
        onSuccess();
        onClose();
        setNotification({
          message: `Промокод "${promocode.code}" успешно обновлен`,
          type: "success",
        });
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 400:
              setErrorMessage("Такой промокод уже существует");
              break;
            case 401:
              navigate("/xxxopernDyn5fYk/admin/login");
              break;
            case 409:
              setErrorMessage("Вы не изменили процент");
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
      navigate,
      setNotification,
      onClose,
      onSuccess,
      promocode.code,
      newPromocode.amount,
      token,
      promocode.id,
    ],
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
