import type { CartItemProps } from "lib/cart/types";
import { useTranslation } from "react-i18next";

import { Paper, Box } from "@mui/material";
import Typography from "lib/ui/Typography";

import style from "./__style.module.scss";

const CartSummary = ({
  items,
  totalPrice,
}: {
  items: ReadonlyArray<CartItemProps>;
  totalPrice: string;
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Paper
      sx={{
        px: 3,
        py: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "none",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="body3bold"
          className={style.title}
        >
          {t("cart")}
        </Typography>
        <Typography
          variant="body3"
          className={style.quantity}
        >
          {t("quantity")}: {items.length}
        </Typography>
      </Box>
      <Typography variant="body2bold">${totalPrice}</Typography>
    </Paper>
  );
};

CartSummary.displayName = "CartSummary";

export default CartSummary;
