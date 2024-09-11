import Typography from "lib/ui/Typography";
import { useTranslation } from "react-i18next";
import type { CategoryProps } from "lib/category/types";

import Filter from "../__Filter";

import style from "./__style.module.scss";

const Filters = ({
  categories,
}: {
  categories: ReadonlyArray<CategoryProps>;
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={style.filters}>
      <Typography
        component="h3"
        variant="body1"
      >
        {t("filter")}
      </Typography>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <Filter filter={category} />
          </li>
        ))}
      </ul>
    </div>
  );
};

Filters.displayName = "Filters";

export default Filters;
