import type { SupportedMedia } from "lib/media/types";

export type CartItemProps = {
  id: string;
  title: string;
  price: string;
  country: null | string;
  media: null | SupportedMedia;
  quantity: number;
  quantityInCart: number;
};
export type CartStep = 1 | 2;

export type CartContextStateValue = {
  step: CartStep;
  isCartOpen: boolean;
};

export type CartContextDispatchValue = (_: CartContextStateValue) => void;

export type CartContextItemsStateValue = {
  items: ReadonlyArray<CartItemProps>;
  isLoading: boolean;
  fastCheckoutItem?: null | CartItemProps;
};

export type Action =
  | {
      // Используется на странице, пользователь может добавить лишь 1 товар, изменить кол-во он может только в корзине
      type: "ADD";
      item: CartItemProps;
    }
  | {
      type: "REMOVE";
      id: number;
    }
  | {
      type: "UPDATE";
      id: number;
      quantity: number;
    }
  | {
      type: "INITIAL_LOAD";
      items: ReadonlyArray<CartItemProps>;
    }
  | {
      type: "LOAD_ERROR";
    }
  | {
      type: "CLEAR";
    }
  | {
      type: "FAST_CHECKOUT";
      fastCheckoutItem: null | CartItemProps;
    };

export type CartContextItemsDispatchValue = (action: Action) => void;
