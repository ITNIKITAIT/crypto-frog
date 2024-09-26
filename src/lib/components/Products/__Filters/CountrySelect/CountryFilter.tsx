import { useCallback, useState } from "react";
import type { CountryProps } from "lib/category/types";
import CountryCheckbox from "lib/ui/CountryCheckbox";
import { useNavigate } from "react-router-dom";
import { useFilter } from "../../__context";

const CountryFilter = ({
  filter,
  disabled,
}: {
  filter: CountryProps;
  disabled?: boolean;
}): JSX.Element => {
  const { selectedCountries, setSelectedCountries } = useFilter();
  const [isChecked, setIsChecked] = useState<boolean>(
    selectedCountries.includes(filter.name),
  );
  const navigate = useNavigate();

  const handleCheckboxChange = useCallback(() => {
    const updatedChecked = !isChecked;
    setIsChecked(updatedChecked);

    const newSelectedCountries = updatedChecked
      ? [...selectedCountries, filter.name]
      : selectedCountries.filter(name => name !== filter.name);

    setSelectedCountries(newSelectedCountries);

    if (newSelectedCountries.length > 0) {
      const countriesNames = newSelectedCountries.join(",");
      navigate(`?countries=${countriesNames}`, { replace: true });
    } else {
      navigate(`?`, { replace: true });
    }
  }, [
    isChecked,
    navigate,
    filter.name,
    selectedCountries,
    setSelectedCountries,
  ]);

  return (
    <CountryCheckbox
      id={filter.id.toString()}
      disabled={disabled}
      label={filter.name}
      checked={isChecked}
      onChange={handleCheckboxChange}
    />
  );
};

export default CountryFilter;
