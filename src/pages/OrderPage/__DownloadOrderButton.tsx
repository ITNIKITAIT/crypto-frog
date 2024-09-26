import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import { useCallback, useState } from "react";
// import { getApiUserOrderDownload } from "lib/endpoints/api/user/order/download/get";
import { AxiosError } from "axios";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

const DownloadOrderButton = ({ orderId }: { orderId: string }): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();

  const handleDownloadKeys = useCallback(async () => {
    try {
      // const response = await getApiUserOrderDownload({
      //   id: orderId,
      // });
      // const blob = new Blob([response.data], { type: "text/plain" });
      // const url = URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = `order-${orderId}.txt`;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      // URL.revokeObjectURL(url);
      window.open(
        `https://t.me/frog_store_bot?start=${orderId}`,
        "_blank",
        "noreferrer",
      );
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage(t("errorkey"));
      }
    }
  }, [orderId, t]);

  return (
    <>
      <ButtonContainer align="center">
        <Button
          variant="primary"
          onClick={handleDownloadKeys}
        >
          {t("downloadkeys")}
        </Button>
      </ButtonContainer>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </>
  );
};

DownloadOrderButton.displayName = "DownloadOrderButton";

export default DownloadOrderButton;
