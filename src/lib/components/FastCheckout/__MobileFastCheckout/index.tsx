import {
  useCartItemsDispatch,
  useCartItemsState,
} from "lib/cart/items-context";
// import Modal from "lib/ui/Modal";
import { useCallback } from "react";
import { Box, Divider, Drawer, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import Typography from "lib/ui/Typography";
// import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import Content from "./__Content";
import Thumbnail from "./__Thumbnail";
import style from "./__style.module.scss";

const MobileFastCheckout = (): JSX.Element => {
  const { fastCheckoutItem } = useCartItemsState();
  const cartItemsDispatch = useCartItemsDispatch();
  const { t } = useTranslation();

  const handleCartClose = useCallback(() => {
    cartItemsDispatch({
      type: "FAST_CHECKOUT",
      fastCheckoutItem: null,
    });
  }, [cartItemsDispatch]);

  return (
    <Drawer
      anchor="bottom"
      open={fastCheckoutItem !== null && fastCheckoutItem !== undefined}
      onClose={handleCartClose}
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
          <Typography variant="body2bold">{t("payment")}</Typography>
          <IconButton onClick={handleCartClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        {fastCheckoutItem ? <Content item={fastCheckoutItem} /> : <Thumbnail />}
      </Box>
    </Drawer>
  );
};

MobileFastCheckout.displayName = MobileFastCheckout;

export default MobileFastCheckout;
