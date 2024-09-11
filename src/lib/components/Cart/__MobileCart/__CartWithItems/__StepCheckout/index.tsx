import { useCartItemsState } from "lib/cart/items-context";
import { useMemo } from "react";
import { round } from "lib/utils/round";
import { Grid } from "@mui/material";
import OrderCheckoutForm from "lib/components/OrderCheckoutForm";
import numberToUsd from "lib/price/numberToUsd";
import CartSummary from "./__CartSummary";

const StepCheckout = (): JSX.Element => {
  const { items } = useCartItemsState();

  const totalPrice = useMemo(
    () =>
      numberToUsd(
        round(
          items.reduce(
            (acc, item) => acc + +item.price * item.quantityInCart,
            0,
          ),
          2,
        ),
      ),
    [items],
  );

  return (
    <Grid
      container
      p={2}
    >
      <Grid
        item
        xs={12}
      >
        <CartSummary
          items={items}
          totalPrice={totalPrice}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <OrderCheckoutForm
          items={items}
          totalPrice={totalPrice}
        />
      </Grid>
    </Grid>
  );
};

StepCheckout.displayName = "StepCheckout";

export default StepCheckout;
