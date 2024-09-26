import { Box } from "@mui/material";
import type { CategoryProps } from "lib/category/types";
import type { ProductProps } from "lib/product/types";
import { Fragment } from "react";
import Typography from "lib/ui/Typography";
import { useTranslation } from "react-i18next";
import Filters from "./__Filters";
import FiltersButton from "./__FiltersButton";
import ProductList from "./__ProductList";

import style from "./__style.module.scss";

const Content = ({
  categories,
  allCategories,
  products,
}: {
  categories: ReadonlyArray<CategoryProps>;
  allCategories: ReadonlyArray<CategoryProps>;
  products: ReadonlyArray<ProductProps>;
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className={style["title-wrapper"]}>
        <Typography
          component="h2"
          variant="title2"
        >
          {t("products")}
        </Typography>
        <FiltersButton categories={allCategories} />
      </div>

      <div className={style["products-layout"]}>
        <Box component="aside">
          <Filters
            products={products}
            categories={allCategories}
          />
        </Box>

        <Box>
          <ProductList
            categories={categories}
            products={products}
          />
        </Box>
      </div>
    </Fragment>
  );
};

Content.displayName = "Content";

export default Content;
