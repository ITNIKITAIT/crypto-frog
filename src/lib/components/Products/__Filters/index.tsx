import type { CategoryProps, CountryProps } from "lib/category/types";
import { ProductProps } from "lib/product/types";
import Typography from "lib/ui/Typography";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import FiltersSelect from "./FiltersSelect";

// import Filter from "../__Filter";

import style from "./__style.module.scss";
import CountrySelect from "./CountrySelect";

const Filters = ({
  categories,
  products,
}: {
  categories: ReadonlyArray<CategoryProps>;
  products: ReadonlyArray<ProductProps>;
}): JSX.Element => {
  const { t } = useTranslation();

  const getCountries = useCallback(
    (listOfproducts: ReadonlyArray<ProductProps>) =>
      listOfproducts
        .filter(product => product.country)
        .map(
          (product, i) =>
            product.country && {
              id: i + 1000,
              name: product.country,
            },
        ),
    [],
  );

  return (
    <div className={style.filters}>
      <Typography
        component="h3"
        variant="body1"
      >
        {t("filter")}
      </Typography>
      <FiltersSelect
        products={products}
        title="typeProxy"
        categories={categories}
      />
      <CountrySelect
        title="geoProxy"
        countries={getCountries(products) as CountryProps[]}
      />
    </div>
  );
};

Filters.displayName = "Filters";

export default Filters;
