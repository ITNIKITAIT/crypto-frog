import { Alert, Box, Grid } from "@mui/material";
import { AxiosError } from "axios";
import { getApiAdminItemKeysDownloadDelete } from "lib/endpoints/api/admin/item/keys/download/delete/get";
import { getApiAdminItemKeysDownload } from "lib/endpoints/api/admin/item/keys/download/get";

import InputNumber from "lib/inputs/InputNumber";
import { useNotification } from "lib/notification";
import Button from "lib/ui/Button";
import Checkbox from "lib/ui/Checkbox";
import Modal from "lib/ui/Modal";
import Typography from "lib/ui/Typography";
import { useCallback, useState } from "react";
import style from "./__style.module.scss";

const downloadTextFile = (productId: string, text: string) => {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `productKeys-product-${productId}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const DownloadKeysModal = ({
  productId,
  productName,
  isModalOpen,
  availableKeysQuantity,
  token,
  onClose,
  onSuccess,
}: {
  productId: number;
  productName: string;
  isModalOpen: boolean;
  availableKeysQuantity: number;
  token: null | string;
  onClose: () => void;
  onSuccess: () => void;
}): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(
    availableKeysQuantity > 0 ? 1 : 0,
  );
  const [downloadWithoutReserve, setDownloadWithoutReserve] =
    useState<boolean>(false);

  const { setNotification } = useNotification();
  const handleDownloadWithoutReserve = useCallback(() => {
    setDownloadWithoutReserve(!downloadWithoutReserve);
  }, [downloadWithoutReserve]);

  const handleQuantityChange = useCallback((newValue: number) => {
    setQuantity(newValue);
  }, []);

  const handleDownloadProduct = useCallback(async () => {
    let keys = "";
    if (downloadWithoutReserve) {
      try {
        setIsLoading(true);
        const response = await getApiAdminItemKeysDownload({
          itemId: productId,
          quantity,
          token,
        });
        keys = response.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setErrorMessage(`Ошибка при выгрузке ключей (без резервации)`);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        const response = await getApiAdminItemKeysDownloadDelete({
          itemId: productId,
          quantity,
          token,
        });
        keys = response.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setErrorMessage(`Ошибка при выгрузке ключей (с резервацией)`);
        }
      } finally {
        setIsLoading(false);
      }
    }
    downloadTextFile(productId.toString(), keys);
    onClose();
    onSuccess();
    setQuantity(0);
    setNotification({
      message: `Ключи для товара №${productId} успешно выгружены ${
        downloadWithoutReserve ? "без удаления в магазине" : ""
      }`,
      type: "success",
    });
  }, [
    downloadWithoutReserve,
    onClose,
    onSuccess,
    productId,
    quantity,
    setNotification,
    token,
  ]);

  return (
    <Modal
      open={isModalOpen}
      title="Выгрузить ключи для товара"
      onClose={onClose}
    >
      <Grid
        container
        p={3}
        pt={1}
        sx={{ gap: "10px" }}
      >
        <Grid
          item
          xs={12}
        >
          <Typography variant="body2">
            <b>Наименование товара:</b> {productName}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography variant="body3">{`Кол-во ключей (Доступно: ${availableKeysQuantity})`}</Typography>
          <br />
          <Box
            sx={{
              display: "flex",
            }}
          >
            <InputNumber
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              max={availableKeysQuantity}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          mt={2}
        >
          <Checkbox
            label="Выгрузить без удаления в магазине"
            id={`download-without-reserve-${productId}`}
            checked={downloadWithoutReserve}
            onChange={handleDownloadWithoutReserve}
          />
        </Grid>
        <Grid
          item
          xs={12}
          mt={3}
        >
          <Button
            isLoading={isLoading}
            fullWidth
            variant="secondary"
            onClick={handleDownloadProduct}
            disabled={availableKeysQuantity === 0 || quantity === 0}
            className={style.load_product}
          >
            Выгрузить товар
          </Button>
        </Grid>
        {errorMessage && (
          <Grid
            item
            xs={12}
            mt={2}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
        )}
      </Grid>
    </Modal>
  );
};

DownloadKeysModal.displayName = "DownloadKeysModal";

export default DownloadKeysModal;
