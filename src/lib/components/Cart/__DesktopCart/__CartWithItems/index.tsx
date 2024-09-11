import { useCartState } from "lib/cart/context";
import { useCartItemsState } from "lib/cart/items-context";
import StepCart from "./__StepCart";
import StepCheckout from "./__StepCheckout";

const CartWithItems = (): null | JSX.Element => {
  const { items } = useCartItemsState();
  const { step } = useCartState();
  switch (step) {
    case 1:
      return <StepCart items={items} />;
    case 2:
      return <StepCheckout items={items} />;
    default:
      return null;
  }
};

CartWithItems.displayName = "CartWithItems";

export default CartWithItems;
