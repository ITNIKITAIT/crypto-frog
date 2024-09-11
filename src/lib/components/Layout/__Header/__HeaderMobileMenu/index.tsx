/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from "react";
import Button from "lib/ui/Button";
import Icon from "lib/ui/Icon";
import type { HeaderNavItem } from "../types";

import HeaderDrawer from "./__HeaderDrawer";
import style from "../__style.module.scss";

const HeaderMenu = ({
  navItems,
}: {
  navItems: ReadonlyArray<HeaderNavItem>;
}): JSX.Element => {
  const [isDrawerOpen, setDrawerIsOpen] = useState<boolean>(false);

  const handleToggleDrawer = useCallback(() => {
    setDrawerIsOpen(!isDrawerOpen);
  }, [isDrawerOpen]);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";

      // Находим все элементы, которым нужно запретить фокус
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      // Устанавливаем атрибут tabindex="-1" на каждый элемент
      focusableElements.forEach(element => {
        element.setAttribute("tabindex", "-1");
      });
    } else {
      document.body.style.overflow = "visible";

      /// Сбрасываем атрибут tabindex на доступные для фокуса элементы
      const focusableElements = document.querySelectorAll('[tabindex="-1"]');
      focusableElements.forEach(element => {
        element.removeAttribute("tabindex");
      });
    }
  }, [isDrawerOpen]);

  return (
    <>
      <Button
        variant="secondary"
        icon
        className={style["header-burger"]}
        onClick={handleToggleDrawer}
      >
        <Icon icon={isDrawerOpen ? "cross" : "menu"} />
      </Button>
      <HeaderDrawer
        isDrawerOpen={isDrawerOpen}
        navItems={navItems}
      />
    </>
  );
};

HeaderMenu.displayName = "HeaderMenu";

export default HeaderMenu;
