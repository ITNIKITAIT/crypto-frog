import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "lib/ui/Checkbox";
import type { CategoryProps } from "lib/category/types";
import { useFilter } from "./__context";

const Filter = ({ filter }: { filter: CategoryProps }): JSX.Element => {
  const navigate = useNavigate();
  const { selectedCategories, setSelectedCategories } = useFilter();
  const [isChecked, setIsChecked] = useState<boolean>(
    selectedCategories.includes(filter.id),
  );

  const handleCheckboxChange = useCallback(() => {
    const updatedChecked = !isChecked;
    setIsChecked(updatedChecked);

    const newSelectedCategories = updatedChecked
      ? [...selectedCategories, filter.id]
      : selectedCategories.filter(id => id !== filter.id);

    setSelectedCategories(newSelectedCategories);

    if (newSelectedCategories.length > 0) {
      const categoryIds = newSelectedCategories.join(",");
      navigate(`/categories/${categoryIds}`, { replace: true });
    } else {
      navigate(`/categories`, { replace: true });
    }
  }, [
    isChecked,
    selectedCategories,
    setSelectedCategories,
    navigate,
    filter.id,
  ]);

  useEffect(() => {
    setIsChecked(selectedCategories.includes(filter.id));
  }, [selectedCategories, filter.id, isChecked]);

  return (
    <Checkbox
      label={filter.name}
      id={filter.id.toString()}
      checked={isChecked}
      onChange={handleCheckboxChange}
    />
  );
};

export default Filter;
