import React, { useCallback, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import type { NotificationProps } from "./types";

const Notification = ({ message, type }: NotificationProps) => {
  const [open, setOpen] = useState(!!message);

  const handleClose = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    },
    [],
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
