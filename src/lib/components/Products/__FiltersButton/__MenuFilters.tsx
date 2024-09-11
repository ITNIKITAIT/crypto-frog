import { Popover } from "@mui/material";
import Typography from "lib/ui/Typography";

import type { CategoryProps } from "lib/category/types";
import { useTranslation } from "react-i18next";
import style from "./__style.module.scss";
import Filter from "../__Filter";

const ITEM_HEIGHT = 48;

const MenuFilters = ({
  filters,
  anchorEl,
  open,
  handleClose,
}: {
  filters: ReadonlyArray<CategoryProps>;
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Popover
        id="mobile-filters"
        anchorEl={anchorEl}
        className={style["menu-filters"]}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 10,
              minWidth: "200px",
              backgroundColor: "#232323",
              borderRadius: 32,
              padding: 24,
              paddingTop: 0,
            },
          },
        }}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          component="h3"
          variant="body1"
        >
          {t("filter")}
        </Typography>
        {filters.map(filter => (
          <li
            key={filter.id}
            className={style["filters-item"]}
          >
            <Filter filter={filter} />
          </li>
        ))}
      </Popover>
    </>
  );
};

MenuFilters.displayName = "MenuFilters";

export default MenuFilters;
