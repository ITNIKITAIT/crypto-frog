import { Link } from "react-router-dom";
import Typography from "lib/ui/Typography";
import { useTranslation } from "react-i18next";
import type { HeaderNavItem } from "../types";

import style from "./__style.module.scss";

const HeaderMobileNav = ({
  items,
}: {
  items: ReadonlyArray<HeaderNavItem>;
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <nav className={style["header-drawer--nav"]}>
      <ul>
        {items.map(item => (
          <li key={item.uuid}>
            <Link to={item.link}>
              <Typography
                variant="body2"
                component="span"
              >
                {t(item.label)}
              </Typography>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

HeaderMobileNav.displayName = "HeaderMobileNav";

export default HeaderMobileNav;
