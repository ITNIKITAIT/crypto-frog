import { Box, Divider, Drawer, IconButton } from "@mui/material";
import { useCartDispatch, useCartState } from "lib/cart/context";
import { useCallback } from "react";

import Typography from "lib/ui/Typography";
import { Close } from "@mui/icons-material";
import { useCartItemsState } from "lib/cart/items-context";
import { useTranslation } from "react-i18next";
import style from "./__style.module.scss";
import CartWithItems from "./__CartWithItems";
import EmptyCart from "./__EmptyCart";

const MobileCart = (): null | JSX.Element => {
  const { items } = useCartItemsState();
  const { step, isCartOpen } = useCartState();
  const cartDispatch = useCartDispatch();
  const { t } = useTranslation();

  const toggleDrawerClose = useCallback(() => {
    cartDispatch({
      step: 2,
      isCartOpen: false,
    });
    setTimeout(() => {
      cartDispatch({
        step: 1,
        isCartOpen: false,
      });
    }, 1000);
  }, [cartDispatch]);

  if (!isCartOpen) {
    return null;
  }
  return (
    <Drawer
      anchor="bottom"
      open={isCartOpen}
      onClose={toggleDrawerClose}
      className={style["mobile-cart"]}
    >
      <Box
        sx={{
          minHeight: "80vh",
          overflowY: "auto",
          backgroundColor: "#232323",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          px={3}
          pt={3}
          pb={2}
        >
          <Typography variant="body2bold">
            {step === 1 ? t("cart") : t("payment")}
          </Typography>
          <IconButton onClick={toggleDrawerClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        {items && items.length > 0 ? <CartWithItems /> : <EmptyCart />}
      </Box>
    </Drawer>
  );
};

MobileCart.displayName = "MobileCart";

export default MobileCart;
