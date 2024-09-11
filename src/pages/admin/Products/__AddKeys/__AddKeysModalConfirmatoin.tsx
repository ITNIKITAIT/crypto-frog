import { Box, Alert } from "@mui/material";
import { AxiosError } from "axios";
import { useAuth } from "lib/auth/admin/AuthContext";
import { postApiAdminItemKeys } from "lib/endpoints/api/admin/item/keys/post";
import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import Modal from "lib/ui/Modal";
import Typography from "lib/ui/Typography";
import { useNavigate } from "react-router-dom";
import { FormEvent, useCallback, useState } from "react";

import style from "./__style.module.scss";

function parseInputString(inputString: string): ReadonlyArray<string> {
  const elements = inputString.split(/\n/);
  const filteredElements = elements.filter(element => element.trim() !== "");
  return filteredElements;
}

const AddKeysModalConfirmation = ({
  productId,
  isConfirmationModalOpen,
  onCloseModal,
  onSuccess,
  onSuccessMessage,
  keysString,
  setKeysString,
}: {
  productId: number;
  isConfirmationModalOpen: boolean;
  onCloseModal: () => void;
  onSuccess: () => void;
  onSuccessMessage: () => void;
  keysString: string;
  setKeysString: (keys: string) => void;
}): JSX.Element => {
  const { token } = useAuth();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await postApiAdminItemKeys({
          itemId: productId,
          keys: parseInputString(keysString),
          token,
        });
        setKeysString("");
        onSuccess();
        onCloseModal();
        onSuccessMessage();
        // setShowSuccessMessage(true);
      } catch (error) {
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
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
      keysString,
      onCloseModal,
      onSuccess,
      onSuccessMessage,
      productId,
      token,
      setKeysString,
      navigate,
    ],
  );

  return (
    <Modal
      title="Добавление ключей"
      open={isConfirmationModalOpen}
      onClose={onCloseModal}
    >
      <Box
        component="form"
        px={3}
        onSubmit={handleSubmit}
      >
        <Typography variant="body2bold">
          Вы действительно хотите добавить ключи?
        </Typography>
        <ButtonContainer align="between">
          <Button
            variant="secondary"
            onClick={onCloseModal}
            className={style.cancel}
          >
            Отменить
          </Button>
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

AddKeysModalConfirmation.displayName = "AddKeysModalConfirmation";

export default AddKeysModalConfirmation;
