import { Box, Dialog, DialogTitle } from "@mui/material";
import { ReactNode, useCallback } from "react";
import classNames from "classnames";
import Button from "./Button";
import Icon from "./Icon";

import style from "./__style.module.scss";

const Modal = ({
  title,
  open,
  children,
  className,
  onClose,
}: {
  title: string;
  open: boolean;
  children: ReactNode;
  className?: string;
  onClose: (_: false) => void;
}): JSX.Element => {
  const handleClose = useCallback(() => {
    onClose(false);
  }, [onClose]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classNames(className)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DialogTitle
          sx={{
            maxWidth: 400,
          }}
        >
          {title}
        </DialogTitle>
        <Button
          onClick={handleClose}
          variant="text"
          className={style["modal--close"]}
          icon
        >
          <Icon icon="cross" />
        </Button>
      </Box>

      {children}
    </Dialog>
  );
};

Modal.displayName = "Modal";

export default Modal;
