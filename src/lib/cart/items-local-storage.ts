const addItemToLocalStorage = ({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}): void => {
  if (typeof window !== "undefined") {
    const items = localStorage.getItem("cart");
    if (!items) {
      // Если объект еще не создан
      const initCart = {
        [id]: quantity,
      };
      localStorage.setItem("cart", JSON.stringify(initCart));
    } else {
      const itemsInLocalStorage = JSON.parse(items);

      // Если товара с таким id еще нет в корзине - добавляем
      if (!Object.prototype.hasOwnProperty.call(itemsInLocalStorage, id)) {
        const updatedCart = {
          ...itemsInLocalStorage,
          [id]: quantity,
        };
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        // Если товар с таким id уже есть в корзине - обновляем
        const updatedCart = {
          ...itemsInLocalStorage,
          [id]: itemsInLocalStorage[id] + quantity,
        };
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    }
  }
};

const updateLocalStorage = newState => {
  const itemsToStore = newState.items.reduce((acc, item) => {
    acc[item.id] = item.quantityInCart;
    return acc;
  }, {});

  localStorage.setItem("cart", JSON.stringify(itemsToStore));
};

const updateItemInLocalStorage = ({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}): void => {
  if (typeof window !== "undefined") {
    const items = localStorage.getItem("cart");
    if (items) {
      const itemsInLocalStorage = JSON.parse(items);
      if (Object.prototype.hasOwnProperty.call(itemsInLocalStorage, id)) {
        // Если товар с таким id есть в корзине - обновляем его количество
        itemsInLocalStorage[id] = quantity;
        localStorage.setItem("cart", JSON.stringify(itemsInLocalStorage));
      }
      // Если товара с таким id нет в корзине, можно ничего не делать или добавить его с новым количеством
      else {
        itemsInLocalStorage[id] = quantity;
        localStorage.setItem("cart", JSON.stringify(itemsInLocalStorage));
      }
    } else {
      // Если объект еще не создан, создаем новый объект и добавляем товар с заданным количеством
      const initCart = {
        [id]: quantity,
      };
      localStorage.setItem("cart", JSON.stringify(initCart));
    }
  }
};

const removeItemFromLocalStorage = ({ id }: { id: string }): void => {
  if (typeof window !== "undefined") {
    const items = localStorage.getItem("cart");
    if (items) {
      const itemsInLocalStorage = JSON.parse(items);
      if (Object.prototype.hasOwnProperty.call(itemsInLocalStorage, id)) {
        delete itemsInLocalStorage[id];
        if (itemsInLocalStorage) {
          localStorage.removeItem("cart");
          return;
        }
        localStorage.setItem("cart", JSON.stringify(itemsInLocalStorage));
      }
    }
  }
};

const clearCartInLocalStorage = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
  }
};

export {
  addItemToLocalStorage,
  updateLocalStorage,
  updateItemInLocalStorage,
  clearCartInLocalStorage,
  removeItemFromLocalStorage,
};
