import { useCallback } from "react";
import Typography from "lib/ui/Typography";
import Button from "lib/ui/Button";
import Icon from "lib/ui/Icon";
import { useCartDispatch } from "lib/cart/context";
import { useTranslation } from "react-i18next";
import type { HeaderNavItem } from "../types";
import HeaderMobileNav from "./__HeaderMobileNav";

import style from "./__style.module.scss";

const HeaderDrawer = ({
  isDrawerOpen,
  navItems,
}: {
  isDrawerOpen: boolean;
  navItems: ReadonlyArray<HeaderNavItem>;
}): null | JSX.Element => {
  const cartDispatch = useCartDispatch();
  const { t } = useTranslation();

  const handleCartOpen = useCallback(() => {
    cartDispatch({
      step: 1,
      isCartOpen: true,
    });
  }, [cartDispatch]);

  if (isDrawerOpen) {
    return (
      <>
        <div className={style["header-drawer"]}>
          <div className={style["header-drawer--content"]}>
            <HeaderMobileNav items={navItems} />
            <Button
              variant="secondary"
              className={style["header-mobile-cart"]}
              onClick={handleCartOpen}
            >
              <Icon icon="cart" />
              <Typography
                variant="body2"
                component="span"
              >
                {t("cart")}
              </Typography>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return null;
};

HeaderDrawer.displayName = "HeaderDrawer";

export default HeaderDrawer;
