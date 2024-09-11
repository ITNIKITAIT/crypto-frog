import { Alert, Box, TextField } from "@mui/material";
import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import Modal from "lib/ui/Modal";
import Typography from "lib/ui/Typography";
import { ChangeEvent, useCallback, useState } from "react";
import AddKeysModalConfirmation from "./__AddKeysModalConfirmatoin";

import style from "./__style.module.scss";

function parseInputString(inputString: string): ReadonlyArray<string> {
  const elements = inputString.split(/\n/);

  const filteredElements = elements.filter(element => element.trim() !== "");

  return filteredElements;
}

const AddKeysModal = ({
  productId,
  productName,
  isAddKeysModalOpen,
  onClose,
  onSuccess,
}: {
  productId: number;
  productName: string;
  isAddKeysModalOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}): JSX.Element => {
  const [keysString, setKeysString] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showSuccessMessageKeys, setShowSuccessMessageKeys] =
    useState<boolean>(false);

  const [isAddKeysConfModalOpen, setIsAddKeysConfModalOpen] = useState(false);
  const handleModalOpen = useCallback(
    () => setIsAddKeysConfModalOpen(true),
    [],
  );
  const handleModalClose = useCallback(
    () => setIsAddKeysConfModalOpen(false),
    [],
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeysString(e.target.value);
  }, []);
  const handleSuccessMessage = useCallback(() => {
    setShowSuccessMessageKeys(true);
    setTimeout(() => {
      setShowSuccessMessageKeys(false);
    }, 3000);
  }, []);

  const handleDeleteDuplicates = useCallback(() => {
    const keys = parseInputString(keysString);
    const uniqueKeys = Array.from(new Set(keys));
    setKeysString(uniqueKeys.join("\n"));
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  }, [keysString]);

  const handleCloseModal = useCallback(() => {
    setKeysString("");
    onClose();
  }, [onClose, setKeysString]);

  return (
    <Modal
      open={isAddKeysModalOpen}
      title="Добавить ключи"
      onClose={handleCloseModal}
    >
      <Box
        component="form"
        px={3}
        pb={2}
      >
        <Typography variant="body2">
          <b>Наименование товара:</b> {productName}
        </Typography>
        <br />
        <TextField
          fullWidth
          id={`product-${productId}-keys`}
          label="Ключи"
          name={`product-${productId}-keys`}
          value={keysString}
          onChange={handleChange}
          autoFocus
          rows={10}
          multiline
          helperText="Вводите ключи каждый с новой строки"
        />
        <ButtonContainer className={style["button-container"]}>
          <Button
            variant="secondary"
            onClick={handleDeleteDuplicates}
            className={style.delete}
          >
            Удалить дубли
          </Button>
          <Button
            // isLoading={isLoading}
            disabled={keysString === ""}
            onClick={handleModalOpen}
          >
            Добавить
          </Button>
        </ButtonContainer>
        {showSuccessMessage && (
          <Alert severity="success">Дубликаты удалены</Alert>
        )}
        {showSuccessMessageKeys && (
          <Alert severity="success">Ключи добавлены</Alert>
        )}

        <AddKeysModalConfirmation
          productId={productId}
          onCloseModal={handleModalClose}
          isConfirmationModalOpen={isAddKeysConfModalOpen}
          onSuccessMessage={handleSuccessMessage}
          onSuccess={onSuccess}
          keysString={keysString}
          setKeysString={setKeysString}
        />
      </Box>
    </Modal>
  );
};

AddKeysModal.displayName = "AddKeysModal";

export default AddKeysModal;
