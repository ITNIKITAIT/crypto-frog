import { useState } from "react";
import { Box, TextField, Snackbar } from "@mui/material";
import Button from "lib/ui/Button";
import { postApiAdminTelegramNewsletterSend } from "lib/endpoints/api/telegram/newsletter/send/post";
import style from "./__style.module.scss";

const Newsletter = ({ token }: { token: string }): JSX.Element => {
  const [message, setMessage] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSendMessage = async () => {
    if (token) {
      try {
        const response = await postApiAdminTelegramNewsletterSend({
          message: { message },
          token,
        });

        if (response.status === 200) {
          setSnackbarMessage("Рассылка успешно разослана");
        } else {
          setSnackbarMessage(
            "Произошла ошибка. Повторите действие или обновите страницу",
          );
        }
      } catch {
        setSnackbarMessage(
          "Произошла ошибка. Повторите действие или обновите страницу",
        );
      } finally {
        setOpenSnackbar(true);
        setMessage("");
      }
    }
  };

  return (
    <Box
      p={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        mt: 2,
      }}
    >
      <TextField
        fullWidth
        id="newsletter"
        label="Рассылка"
        autoFocus
        rows={8}
        multiline
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button
        onClick={handleSendMessage}
        variant="secondary"
        className={style.logout}
        disabled={message.trim() === ""}
      >
        Опубликовать
      </Button>
      <Snackbar
        key={Date.now()}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: snackbarMessage.startsWith("Произошла ошибка")
              ? "red"
              : "#A0F901",
            color: "black",
            fontSize: "16px",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      />
    </Box>
  );
};

Newsletter.displayName = "Admin_Newsletter";

export default Newsletter;
