import {
  useCartItemsDispatch,
  useCartItemsState,
} from "lib/cart/items-context";
import Modal from "lib/ui/Modal";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import Content from "./__Content";
import Thumbnail from "./__Thumbnail";
import style from "./__style.module.scss";

const FastCheckout = (): JSX.Element => {
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
    <Modal
      open={fastCheckoutItem !== null && fastCheckoutItem !== undefined}
      onClose={handleCartClose}
      title={t("payment")}
      className={style["mobile-cart"]}
    >
      {fastCheckoutItem ? <Content item={fastCheckoutItem} /> : <Thumbnail />}
    </Modal>
  );
};

FastCheckout.displayName = FastCheckout;

export default FastCheckout;
