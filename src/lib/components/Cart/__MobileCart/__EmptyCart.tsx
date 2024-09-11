import { Box } from "@mui/material";
import Typography from "lib/ui/Typography";
import { t } from "i18next";

const EmptyCart = (): JSX.Element => (
  <Box p={3}>
    <Typography variant="body2bold">{t("emptyCart")}</Typography>
  </Box>
);

EmptyCart.displayName = "EmptyCart";

export default EmptyCart;
