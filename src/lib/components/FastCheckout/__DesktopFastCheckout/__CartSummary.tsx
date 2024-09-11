import type { CartItemProps } from "lib/cart/types";
import { Paper } from "@mui/material";
import Typography from "lib/ui/Typography";

import InputNumber from "lib/inputs/InputNumber";
import { useCallback } from "react";
import style from "./__style.module.scss";

const CartSummary = ({
  item,
  quantity,
  totalPrice,
  onQuantityChange,
}: {
  item: CartItemProps;
  quantity: number;
  totalPrice: string;
  onQuantityChange: (_: number) => void;
}): JSX.Element => {
  const handleChangeQuantity = useCallback(
    (value: number) => {
      if (value > 0) {
        onQuantityChange(value);
      }
    },
    [onQuantityChange],
  );

  return (
    <Paper
      sx={{
        px: 3,
        py: 2,
        gap: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "none",
        borderRadius: "10px",
      }}
    >
      <Typography
        variant="body3bold"
        className={style.title}
      >
        {item.title}
      </Typography>
      <InputNumber
        value={quantity}
        onChange={handleChangeQuantity}
        min={1}
        max={item.quantity}
      />
      <Typography variant="body2bold">${totalPrice}</Typography>
    </Paper>
  );
};

CartSummary.displayName = "CartSummary";

export default CartSummary;
