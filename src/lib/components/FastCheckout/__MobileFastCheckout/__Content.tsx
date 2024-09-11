import { Grid } from "@mui/material";
import type { CartItemProps } from "lib/cart/types";
import OrderCheckoutForm from "lib/components/OrderCheckoutForm";
import { round } from "lib/utils/round";
import { useCallback, useMemo, useState } from "react";
import numberToUsd from "lib/price/numberToUsd";
import CartSummary from "./__CartSummary";

const Content = ({ item }: { item: CartItemProps }): JSX.Element => {
  const [quantity, setQuantity] = useState(item.quantityInCart);
  const totalPrice = useMemo(
    () => numberToUsd(round(+item.price * quantity, 2)),
    [item.price, quantity],
  );

  const handleQuantityChange = useCallback((value: number) => {
    setQuantity(value);
  }, []);

  const finalItem = useMemo(
    () => ({
      ...item,
      quantityInCart: quantity,
    }),
    [item, quantity],
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
          item={item}
          quantity={quantity}
          totalPrice={totalPrice}
          onQuantityChange={handleQuantityChange}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <OrderCheckoutForm
          items={[finalItem]}
          totalPrice={totalPrice}
        />
      </Grid>
    </Grid>
  );
};

Content.displayName = "Content";

export default Content;
