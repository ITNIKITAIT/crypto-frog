import { useState, useCallback, useMemo } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CountryProps } from "lib/category/types";
import { useTranslation } from "react-i18next";
import style from "./__style.module.scss";
import CountryFilter from "./CountryFilter";
import { useFilter } from "../../__context";

const CountrySelect = ({
  countries,
  title,
}: {
  countries: ReadonlyArray<CountryProps>;
  title: string;
}): JSX.Element => {
  const [onSelected, setOnSelected] = useState<boolean>(false);
  const { t } = useTranslation();
  const { productsForCategory } = useFilter();

  const toggleSelect = useCallback((): void => {
    setOnSelected(prev => !prev);
  }, []);

  const existingCountries = useMemo(
    () =>
      countries.filter(country =>
        productsForCategory.some(product => product.country === country.name),
      ),
    [countries, productsForCategory],
  );
  const disabledCountries = useMemo(
    () =>
      countries.filter(
        country =>
          !productsForCategory.some(
            product => product.country === country.name,
          ),
      ),
    [countries, productsForCategory],
  );
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
        existingCountries.map(country => (
          <CountryFilter
            key={country.id}
            filter={country}
          />
        ))}
      {onSelected &&
        disabledCountries.map(country => (
          <CountryFilter
            disabled
            key={country.id}
            filter={country}
          />
        ))}
    </>
  );
};

export default CountrySelect;
