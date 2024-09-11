import axios, { AxiosError } from "axios";
import { getApiUserItemAll } from "lib/endpoints/api/user/item/all/get";
import { useCallback, useEffect, useState } from "react";
import type { ProductProps } from "./types";

export const useProducts = () => {
  const [products, setProducts] = useState<null | ReadonlyArray<ProductProps>>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | AxiosError>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await getApiUserItemAll();
      if (response.status === 200) {
        setProducts(response.data);
      }
      if (response.status === 204) {
        setProducts([]);
      }
      setIsLoading(false);
    } catch (_error) {
      if (axios.isAxiosError(_error)) {
        setError(_error);
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const reload = useCallback(() => fetchProducts(), [fetchProducts]);

  return { products, isLoading, error, reload };
};
