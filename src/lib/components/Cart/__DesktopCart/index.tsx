import { useCallback } from "react";
import { useCartDispatch, useCartState } from "lib/cart/context";
import { useCartItemsState } from "lib/cart/items-context";
import { useTranslation } from "react-i18next";

import { Box } from "@mui/material";
import Modal from "lib/ui/Modal";

import CartWithItems from "./__CartWithItems";
import EmptyCart from "./__EmptyCart";

import style from "./__style.module.scss";

const DesktopCart = (): JSX.Element => {
  const { items } = useCartItemsState();
  const { step, isCartOpen } = useCartState();
  const cartDispatch = useCartDispatch();
  const { t } = useTranslation();

  const handleCartClose = useCallback(() => {
    const stepToSwitch = step === 1 ? 1 : 2;
    cartDispatch({
      step: stepToSwitch,
      isCartOpen: false,
    });
    setTimeout(() => {
      cartDispatch({
        step: 1,
        isCartOpen: false,
      });
    }, 300);
  }, [cartDispatch, step]);

  return (
    <Modal
      open={isCartOpen}
      onClose={handleCartClose}
      className={style.cart}
      title={step === 1 ? t("cart") : t("payment")}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      />
      {items && items.length > 0 ? <CartWithItems /> : <EmptyCart />}
    </Modal>
  );
};
DesktopCart.displayName = "DesktopCart";

export default DesktopCart;
