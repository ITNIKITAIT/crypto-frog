import DialogContent from "@mui/material/DialogContent";
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
    <DialogContent>
      <CartSummary
        item={item}
        quantity={quantity}
        totalPrice={totalPrice}
        onQuantityChange={handleQuantityChange}
      />

      <OrderCheckoutForm
        items={[finalItem]}
        totalPrice={totalPrice}
      />
    </DialogContent>
  );
};

Content.displayName = "Content";

export default Content;
