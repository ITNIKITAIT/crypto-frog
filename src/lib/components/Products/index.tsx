import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress } from "@mui/material";

import { useCategories } from "lib/category/useCategories";
import { useProducts } from "lib/product/useProducts";
import type { CategoryProps } from "lib/category/types";
import { useFilter } from "./__context";
import Content from "./__Content";
import style from "./__style.module.scss";

const Products = (): JSX.Element => {
  const {
    categories: allCategories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useCategories();

  const {
    products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useProducts();

  const { selectedCategories } = useFilter();

  const [categories, setCategories] = useState<ReadonlyArray<CategoryProps>>(
    [],
  );

  useEffect(() => {
    if (selectedCategories.length > 0 && allCategories) {
      const selectedCategoryObjects = allCategories.filter(category =>
        selectedCategories.includes(category.id),
      );
      setCategories(selectedCategoryObjects);
    } else {
      setCategories(allCategories || []);
    }
  }, [allCategories, selectedCategories]);

  if (isCategoriesLoading || isProductsLoading || !allCategories || !products) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (productsError) {
    return (
      <Alert
        severity="error"
        sx={{ mt: 4, maxWidth: "300px" }}
      >
        Ошибка при загрузке товаров
      </Alert>
    );
  }

  if (categoriesError) {
    return (
      <Alert
        severity="error"
        sx={{ mt: 4, maxWidth: "300px" }}
      >
        Ошибка при загрузке категорий
      </Alert>
    );
  }

  return (
    <section
      className={style.products}
      id="section-products"
    >
      <Content
        categories={categories}
        allCategories={allCategories}
        products={products}
      />
    </section>
  );
};

export default Products;
