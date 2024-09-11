import type { CartItemProps } from "lib/cart/types";

import Icon from "lib/ui/Icon";

import { useCallback } from "react";
import { useCartItemsDispatch } from "lib/cart/items-context";

import { Box, Grid, IconButton } from "@mui/material";

import type { SupportedIcon } from "lib/ui/__types";
import ReactCountryFlag from "react-country-flag";
import Typography from "lib/ui/Typography";
import InputNumber from "lib/inputs/InputNumber";
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
    <>
      <Grid
        container
        p={2}
        pb={3}
      >
        <Grid
          item
          xs="auto"
          pr={1}
        >
          <IconButton onClick={handleRemoveItem}>
            <Icon icon="cross" />
          </IconButton>
        </Grid>
        <Grid
          item
          xs="auto"
          pr={2}
        >
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
        </Grid>
        <Grid
          item
          // xs=
          // maxWidth={200}}
          xs
          // sx={{
          //   maxWidth: {
          //     xs: 300,
          //     sm: 400,
          //   },
          // }}
        >
          <Typography
            variant="body3bold"
            component="span"
            className="cart-item__name"
          >
            {item.title}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
        pb={2}
      >
        <Grid
          item
          xs={6}
        >
          <Box pl={3}>
            <InputNumber
              value={item.quantityInCart}
              onChange={handleChangeQuantity}
              min={1}
              max={item.quantity}
              className={style["input-number"]}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Box
            pr={3}
            sx={{
              textAlign: "right",
            }}
          >
            <Typography
              variant="body1"
              component="span"
            >
              ${item.price}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

CartItem.displayName = "CartItem";

export default CartItem;
