import { Popover } from "@mui/material";
// import Typography from "lib/ui/Typography";

import { ProductProps } from "lib/product/types";
import type { CategoryProps } from "lib/category/types";
// import { useTranslation } from "react-i18next";
import style from "./__style.module.scss";
import Filters from "../__Filters";
// import Filter from "../__Filter";

const ITEM_HEIGHT = 30;

const MenuFilters = ({
  filters,
  anchorEl,
  open,
  handleClose,
  products,
}: {
  filters: ReadonlyArray<CategoryProps>;
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  products: ReadonlyArray<ProductProps>;
}): JSX.Element => (
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
      <Filters
        products={products}
        categories={filters}
      />
      {/* {filters.map(filter => (
        <li
          key={filter.id}
          className={style["filters-item"]}
        >
          <Filter filter={filter} />
        </li>
      ))} */}
    </Popover>
  </>
);

MenuFilters.displayName = "MenuFilters";

export default MenuFilters;
