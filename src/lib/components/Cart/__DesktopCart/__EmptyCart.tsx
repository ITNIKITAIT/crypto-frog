import { DialogContent, DialogContentText } from "@mui/material";
import { t } from "i18next";

const EmptyCart = (): JSX.Element => (
  <DialogContent>
    <DialogContentText>{t("emptyCart")}</DialogContentText>
  </DialogContent>
);

EmptyCart.displayName = "EmptyCart";

export default EmptyCart;
