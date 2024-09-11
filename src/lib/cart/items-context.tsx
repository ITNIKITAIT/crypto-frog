import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { getApiUserItemById } from "lib/endpoints/api/user/item/id/get";

import type {
  CartContextItemsDispatchValue,
  CartContextItemsStateValue,
  CartItemProps,
} from "./types";
import { cartItemsReducer } from "./items-reducer";

const CartItemsContextState = createContext<CartContextItemsStateValue | null>(
  null,
);
const CartItemsContextDispatch =
  createContext<CartContextItemsDispatchValue | null>(null);

const setInitialProviderState =
  async (): Promise<CartContextItemsStateValue> => {
    try {
      // Получить данные из localStorage
      const cartData = localStorage.getItem("cart");

      if (!cartData) {
        return {
          items: [],
          isLoading: false,
        };
      }

      const parsedData = JSON.parse(cartData);
      const productIds = Object.keys(parsedData);
      // Создать промисы для всех запросов на получение данных о товарах
      const productPromises = productIds.map(id =>
        getApiUserItemById({
          id: +id,
        }),
      );

      // Ожидание завершения всех запросов
      const productResponses = await Promise.all(productPromises);
      // Преобразование ответов в объекты с id и количеством из localStorage
      const products: ReadonlyArray<CartItemProps> = productResponses.map(
        response => ({
          id: response.data.id.toString(),
          title: response.data.name,
          shortDescription: response.data.shortDescription,
          detailedDescription: response.data.detailedDescription,
          supplierContact: response.data.supplierContact,
          price: response.data.price.toString(),
          country: response.data.country,
          media: response.data.media,
          quantity: response.data.quantity,
          quantityInCart: parsedData[response.data.id.toString()],
        }),
      );

      return {
        items: products,
        isLoading: false,
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error setting the initial state:", error);
      return {
        items: [],
        isLoading: false,
      };
    }
  };

const CartItemsProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  // TODO: Хранить айди товара и кол-во в локал сторадж
  // Вызывать функцию getApiUserItemById для каждого из товаров чтобы взять остальные поля
  const [state, dispatch] = useReducer(cartItemsReducer, {
    items: [],
    isLoading: true,
  });

  useEffect(() => {
    const loadInitialState = async () => {
      try {
        const initialState = await setInitialProviderState();
        dispatch({ type: "INITIAL_LOAD", items: initialState.items });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error loading initial state:", error);
        dispatch({ type: "LOAD_ERROR" });
      }
    };

    loadInitialState();
  }, []);

  const memoisedState = useMemo(() => state, [state]);
  const memoisedDispatch = useMemo(() => dispatch, [dispatch]);
  return (
    <CartItemsContextState.Provider value={memoisedState}>
      <CartItemsContextDispatch.Provider value={memoisedDispatch}>
        {children}
      </CartItemsContextDispatch.Provider>
    </CartItemsContextState.Provider>
  );
};

CartItemsProvider.displayName = "CartItemsProvider";

const useCartItemsState = (): CartContextItemsStateValue => {
  const context = useContext(CartItemsContextState);
  if (context === null) {
    throw new Error("useCartState must be used within a CartProvider");
  }
  return context;
};

const useCartItemsDispatch = (): CartContextItemsDispatchValue => {
  const context = useContext(CartItemsContextDispatch);
  if (context === null) {
    throw new Error("useCartDispatch must be used within a CartProvider");
  }
  return context;
};

export { CartItemsProvider, useCartItemsState, useCartItemsDispatch };
