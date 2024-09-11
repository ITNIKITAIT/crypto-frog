import { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";
import { getApiUserCategoryAll } from "lib/endpoints/api/user/category/all/get";
import type { CategoryProps } from "./types";

export const useCategories = () => {
  const [categories, setCategories] =
    useState<null | ReadonlyArray<CategoryProps>>(null);
  const [error, setError] = useState<null | AxiosError>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getApiUserCategoryAll();
      if (response.status === 200) {
        setCategories([...response.data]);
      }
      if (response.status === 204) {
        setCategories([]);
      }
    } catch (_error: unknown) {
      if (_error instanceof AxiosError) {
        setError(_error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const reload = useCallback(() => fetchCategories(), [fetchCategories]);

  return { categories, error, isLoading, reload };
};
