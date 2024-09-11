import { ReactNode, createContext, useContext, useState } from "react";
import type { CartContextDispatchValue, CartContextStateValue } from "./types";

const CartStateContext = createContext<CartContextStateValue | null>(null);
const CartDispatchContext = createContext<CartContextDispatchValue | null>(
  null,
);

const CartProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [value, setValue] = useState<CartContextStateValue | null>({
    step: 1,
    isCartOpen: false,
  });

  return (
    <CartStateContext.Provider value={value}>
      <CartDispatchContext.Provider value={setValue}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

CartProvider.displayName = "CartProvider";

const useCartState = (): CartContextStateValue => {
  const context = useContext(CartStateContext);
  if (context === null) {
    throw new Error("useCartState must be used within a CartProvider");
  }
  return context;
};

const useCartDispatch = (): CartContextDispatchValue => {
  const context = useContext(CartDispatchContext);
  if (context === null) {
    throw new Error("useCartDispatch must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCartState, useCartDispatch };
