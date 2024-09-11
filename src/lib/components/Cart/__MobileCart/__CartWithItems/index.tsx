import { useCartState } from "lib/cart/context";
import StepCart from "./__StepCart";
import StepCheckout from "./__StepCheckout";

const CartWithItems = (): null | JSX.Element => {
  const { step } = useCartState();
  switch (step) {
    case 1:
      return <StepCart />;
    case 2:
      return <StepCheckout />;
    default:
      return null;
  }
};

CartWithItems.displayName = "CartWithItems";

export default CartWithItems;
