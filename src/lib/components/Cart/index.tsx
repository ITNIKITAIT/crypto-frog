import FastCheckout from "../FastCheckout/__DesktopFastCheckout";
import MobileFastCheckout from "../FastCheckout/__MobileFastCheckout";
import DesktopCart from "./__DesktopCart";
import MobileCart from "./__MobileCart";

const Cart = (): JSX.Element => (
  <>
    <DesktopCart />
    <FastCheckout />
    <MobileCart />
    <MobileFastCheckout />
  </>
);

Cart.displayName = Cart;

export default Cart;
