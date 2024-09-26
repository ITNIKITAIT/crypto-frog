import { useState, useCallback, useMemo } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CategoryProps } from "lib/category/types";
import { useTranslation } from "react-i18next";
import { ProductProps } from "lib/product/types";
import style from "./__style.module.scss";
import Filter from "../../__Filter";

const FiltersSelect = ({
  categories,
  title,
  products,
}: {
  categories: ReadonlyArray<CategoryProps>;
  products: ReadonlyArray<ProductProps>;
  title: string;
}): JSX.Element => {
  const [onSelected, setOnSelected] = useState<boolean>(false);
  const { t } = useTranslation();

  const existingCategories = useMemo(
    () =>
      categories.filter(category =>
        products.some(product => product.categoryId === category.id),
      ),
    [categories, products],
  );
  const disabledCategories = useMemo(
    () =>
      categories.filter(
        category =>
          !products.some(product => product.categoryId === category.id),
      ),
    [categories, products],
  );

  const toggleSelect = useCallback((): void => {
    setOnSelected(prev => !prev);
  }, []);

  return (
    <>
      <button
        onClick={toggleSelect}
        style={{
          opacity: onSelected ? "0.95" : "1",
          borderBottom: onSelected
            ? "1px solid #A0F900"
            : "1px solid #ffffff80",
        }}
        className={style["filters-select"]}
        type="button"
      >
        <p>{t(title)}</p>
        <KeyboardArrowDownIcon
          style={{
            transform: onSelected ? "rotate(180deg)" : "rotate(0)",
          }}
        />
      </button>
      {onSelected &&
        existingCategories.map(category => (
          <Filter
            key={category.id}
            filter={category}
          />
        ))}
      {onSelected &&
        disabledCategories.map(category => (
          <Filter
            disabled
            key={category.id}
            filter={category}
          />
        ))}
    </>
  );
};

export default FiltersSelect;
