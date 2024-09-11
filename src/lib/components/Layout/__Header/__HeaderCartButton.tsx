import { useCallback } from "react";
import { useCartDispatch } from "lib/cart/context";
import { useCartItemsState } from "lib/cart/items-context";

import Button from "lib/ui/Button";
import Icon from "lib/ui/Icon";

import style from "./__style.module.scss";

const HeaderCartButton = (): JSX.Element => {
  const { items } = useCartItemsState();
  const cartDispatch = useCartDispatch();

  const handleCartOpen = useCallback(() => {
    cartDispatch({
      step: 1,
      isCartOpen: true,
    });
  }, [cartDispatch]);

  return (
    <Button
      variant="secondary"
      icon
      className={style["header-cart"]}
      onClick={handleCartOpen}
    >
      <Icon
        icon={items !== undefined && items.length > 0 ? "cart_active" : "cart"}
      />
    </Button>
  );
};

HeaderCartButton.displayName = "HeaderCartButton";

export default HeaderCartButton;
