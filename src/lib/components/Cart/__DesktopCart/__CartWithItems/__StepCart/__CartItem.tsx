/* eslint-disable no-unused-vars */
import type { CartItemProps } from "lib/cart/types";

import ReactCountryFlag from "react-country-flag";
import Icon from "lib/ui/Icon";
import Typography from "lib/ui/Typography";
import Button from "lib/ui/Button";

import { useCallback } from "react";
import { useCartItemsDispatch } from "lib/cart/items-context";

import InputNumber from "lib/inputs/InputNumber";

import type { SupportedIcon } from "lib/ui/__types";
import style from "./__style.module.scss";

const CartItem = ({
  item,
  onQuantityChange,
}: {
  item: CartItemProps;
  onQuantityChange: (id: string, quantity: number) => void;
}): JSX.Element => {
  const cartItemsDispatch = useCartItemsDispatch();
  const handleChangeQuantity = useCallback(
    (value: number) => {
      if (value > 0) {
        onQuantityChange(item.id, value);
      }
    },
    [item.id, onQuantityChange],
  );

  const handleRemoveItem = useCallback(() => {
    cartItemsDispatch({
      type: "REMOVE",
      id: +item.id,
    });
  }, [cartItemsDispatch, item.id]);

  return (
    <div className={style["cart-item"]}>
      <Button
        variant="text"
        icon
        className={style["cart-item__remove-button"]}
        onClick={handleRemoveItem}
      >
        <Icon icon="cross" />
      </Button>
      <div className={style["cart-item__media-wrapper"]}>
        <Icon
          icon={item.media as SupportedIcon}
          className={style["cart-item__media"]}
        />
        {item.country && (
          <ReactCountryFlag
            countryCode={item.country}
            style={{
              fontSize: "22px",
            }}
            aria-label={item.country}
            className={style["cart-item__flag"]}
          />
        )}
      </div>
      <div className={style["cart-item__info"]}>
        <Typography
          variant="body3bold"
          component="span"
          className="cart-item__name"
        >
          {item.title}
        </Typography>
      </div>
      <InputNumber
        value={item.quantityInCart}
        onChange={handleChangeQuantity}
        min={1}
        max={item.quantity}
      />
      <Typography
        variant="body1"
        component="span"
      >
        ${item.price}
      </Typography>
    </div>
  );
};

CartItem.displayName = "CartItem";

export default CartItem;
