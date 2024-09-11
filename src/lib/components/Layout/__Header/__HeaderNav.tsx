import { useTranslation } from "react-i18next";
import type { HeaderNavItem } from "./types";

import style from "./__style.module.scss";
import NavItemLink from "./__NavItemLink";

const HeaderNav = ({
  navItems,
}: {
  navItems: ReadonlyArray<HeaderNavItem>;
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <nav className={style["header-nav"]}>
      <ul>
        {navItems.map(item => (
          <li key={item.uuid}>
            <NavItemLink item={{ ...item, label: t(item.label) }} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

HeaderNav.displayName = "HeaderNav";

export default HeaderNav;
