import {
  removeItemFromLocalStorage,
  updateItemInLocalStorage,
  updateLocalStorage,
} from "./items-local-storage";
import type { CartContextItemsStateValue, Action } from "./types";

export const cartItemsReducer = (
  state: CartContextItemsStateValue,
  action: Action,
): CartContextItemsStateValue => {
  switch (action.type) {
    case "INITIAL_LOAD": {
      return {
        ...state,
        items: action.items,
        isLoading: false,
      };
    }
    case "ADD": {
      const itemIndex = state.items.findIndex(
        item => item.id === action.item.id,
      );
      if (itemIndex !== -1) {
        if (
          state.items[itemIndex].quantityInCart >=
          state.items[itemIndex].quantity
        ) {
          return state;
        }
        const existingItem = state.items[itemIndex];
        const updatedItem = {
          ...existingItem,
          quantityInCart: existingItem.quantityInCart + 1,
        };
        const newState = {
          ...state,
          items: [
            ...state.items.slice(0, itemIndex),
            updatedItem,
            ...state.items.slice(itemIndex + 1),
          ],
        };

        // Обновление localStorage после изменения состояния
        updateLocalStorage(newState);

        return newState;
      }
      const newItem = {
        ...action.item,
        quantityInCart: 1, // начальное количество для нового товара
      };
      const newState = {
        ...state,
        items: [...state.items, newItem],
      };

      // Обновление localStorage после изменения состояния
      updateLocalStorage(newState);

      return newState;
    }
    case "REMOVE": {
      const updatedItems = state.items.filter(item => +item.id !== action.id);

      removeItemFromLocalStorage({ id: action.id.toString() });
      return {
        ...state,
        items: updatedItems,
      };
    }
    case "CLEAR": {
      localStorage.removeItem("cart");
      return {
        ...state,
        items: [],
      };
    }
    case "UPDATE": {
      const itemIndex = state.items.findIndex(item => +item.id === action.id);
      if (itemIndex === -1) {
        // Если товара нет в корзине, ничего не делаем
        return state;
      }
      updateItemInLocalStorage({
        id: action.id,
        quantity: action.quantity,
      });
      const existingItem = state.items[itemIndex];
      const updatedItem = {
        ...existingItem,
        quantityInCart: action.quantity,
      };
      const updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;
      return {
        ...state,
        items: updatedItems,
      };
    }
    case "LOAD_ERROR": {
      return {
        ...state,
        items: [],
        isLoading: false,
      };
    }
    case "FAST_CHECKOUT": {
      return {
        ...state,
        fastCheckoutItem: action.fastCheckoutItem,
      };
    }
    default:
      throw new Error(`Unhandled action type:  ${(action as Action).type}`);
  }
};
