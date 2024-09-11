import type { CartItemProps } from "lib/cart/types";
import { useTranslation } from "react-i18next";

import {
  DialogContent,
  DialogContentText,
  Divider,
  Box,
  DialogActions,
} from "@mui/material";
import ButtonContainer from "lib/ui/ButtonContainer";
import Button from "lib/ui/Button";
import Typography from "lib/ui/Typography";
import { useCallback, useMemo } from "react";
import { useCartItemsDispatch } from "lib/cart/items-context";
import { useCartDispatch } from "lib/cart/context";
import CartItem from "./__CartItem";

import style from "./__style.module.scss";

const StepCart = ({
  items,
}: {
  items: ReadonlyArray<CartItemProps>;
}): JSX.Element => {
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

  const handleScrollToProducts = useCallback(() => {
    // Close the cart first
    cartDispatch({
      // Update this with the appropriate action to close the cart
      isCartOpen: false,
      step: 1,
    });

    // Ensure the UI has time to update and close the cart
    setTimeout(() => {
      const productsSection = document.getElementById("section-products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 300); // Adjust the delay as needed
  }, [cartDispatch]);

  return (
    <DialogContent>
      <DialogContentText component="div">
        <Divider />
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
      </DialogContentText>
      <DialogActions>
        <ButtonContainer gap="sm">
          <Button
            variant="secondary"
            size="medium"
            onClick={handleScrollToProducts}
            className={style.whiteTextButton}
          >
            {t("continueshopping")}
          </Button>
          <br />
          <Button
            variant="primary"
            size="large"
            onClick={handleNextStep}
          >
            {t("pay")}
          </Button>
        </ButtonContainer>
      </DialogActions>
    </DialogContent>
  );
};

StepCart.displayName = "StepCart";

export default StepCart;
