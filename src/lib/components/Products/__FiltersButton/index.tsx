import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next"; // Переместите этот импорт выше
import Button from "lib/ui/Button";
import Icon from "lib/ui/Icon";
import type { CategoryProps } from "lib/category/types";
import MenuFilters from "./__MenuFilters";
import style from "./__style.module.scss";
import { useFilter } from "../__context";

const FiltersButton = ({
  categories,
}: {
  categories: ReadonlyArray<CategoryProps>;
}): JSX.Element => {
  const { selectedCategories } = useFilter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Button
        onClick={handleClick}
        variant="secondary"
        className={style["filters-button"]}
      >
        <Icon
          icon={selectedCategories.length > 0 ? "filter_active" : "filter"}
        />
        {t("filter")}
      </Button>
      <MenuFilters
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        filters={categories}
      />
    </>
  );
};

FiltersButton.displayName = "FiltersButton";

export default FiltersButton;
