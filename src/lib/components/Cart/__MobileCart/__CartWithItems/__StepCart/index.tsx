import { Box } from "@mui/material";
import {
  useCartItemsDispatch,
  useCartItemsState,
} from "lib/cart/items-context";
import { useCallback, useMemo } from "react";
import { useCartDispatch } from "lib/cart/context";
import { useTranslation } from "react-i18next";
import Typography from "lib/ui/Typography";
import ButtonContainer from "lib/ui/ButtonContainer";
import Button from "lib/ui/Button";
import CartItem from "./__CartItem";

import style from "./__style.module.scss";

const StepCart = (): JSX.Element => {
  const { items } = useCartItemsState();
  const cartItemsDispatch = useCartItemsDispatch();
  const cartDispatch = useCartDispatch();
  const { t } = useTranslation();

  const handleNextStep = useCallback(() => {
    cartDispatch({
      step: 2,
      isCartOpen: true,
    });
  }, [cartDispatch]);

  const handleQuantityChange = useCallback(
    (id: string, newQuantity: number) => {
      cartItemsDispatch({
        type: "UPDATE",
        id: +id,
        quantity: newQuantity,
      });
    },
    [cartItemsDispatch],
  );

  // Count total price based on each item price and quantity
  const totalPrice = useMemo(() => {
    const total = items.reduce(
      (acc, item) => acc + +item.price * item.quantityInCart,
      0,
    );
    return +total.toFixed(2);
  }, [items]);

  return (
    <Box>
      {items.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onQuantityChange={handleQuantityChange}
        />
      ))}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          mt: 2,
          pr: 3,
        }}
      >
        <Typography
          component="span"
          variant="body3"
          className={style.total}
        >
          {t("total")}
        </Typography>
        <Typography
          component="span"
          variant="body1"
        >
          ${totalPrice}
        </Typography>
      </Box>
      <Box
        px={3}
        pb={3}
      >
        <ButtonContainer align="center">
          <Button
            fullWidth
            variant="primary"
            size="large"
            onClick={handleNextStep}
          >
            {t("pay")}
          </Button>
        </ButtonContainer>
      </Box>
    </Box>
  );
};

StepCart.displayName = "StepCart";

export default StepCart;
