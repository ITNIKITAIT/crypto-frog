import type { CartItemProps } from "lib/cart/types";

import { DialogContent } from "@mui/material";
import { useMemo } from "react";
import { round } from "lib/utils/round";
import OrderCheckoutForm from "lib/components/OrderCheckoutForm";
import numberToUsd from "lib/price/numberToUsd";
import CartSummary from "./__CartSummary";

const StepCheckout = ({
  items,
}: {
  items: ReadonlyArray<CartItemProps>;
}): JSX.Element => {
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
    <DialogContent>
      <CartSummary
        items={items}
        totalPrice={totalPrice}
      />
      <OrderCheckoutForm
        items={items}
        totalPrice={totalPrice}
      />
    </DialogContent>
  );
};

StepCheckout.displayName = "StepCheckout";

export default StepCheckout;
