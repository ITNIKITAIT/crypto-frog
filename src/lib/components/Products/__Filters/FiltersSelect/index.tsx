import { useState, useCallback, useMemo } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CategoryProps } from "lib/category/types";
import { useTranslation } from "react-i18next";
import style from "./__style.module.scss";
import Filter from "../../__Filter";
import { useFilter } from "../../__context";

const FiltersSelect = ({
  categories,
  title,
}: {
  categories: ReadonlyArray<CategoryProps>;
  title: string;
}): JSX.Element => {
  const [onSelected, setOnSelected] = useState<boolean>(false);
  const { productsForCountry } = useFilter();
  const { t } = useTranslation();

  const existingCategories = useMemo(
    () =>
      categories.filter(category =>
        productsForCountry.some(product => product.categoryId === category.id),
      ),
    [categories, productsForCountry],
  );
  const disabledCategories = useMemo(
    () =>
      categories.filter(
        category =>
          !productsForCountry.some(
            product => product.categoryId === category.id,
          ),
      ),
    [categories, productsForCountry],
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
