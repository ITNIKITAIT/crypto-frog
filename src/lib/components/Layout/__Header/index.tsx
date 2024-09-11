import Container from "lib/ui/Container";
// import Logo from "lib/ui/Logo";
import HeaderCartButton from "./__HeaderCartButton";
import HeaderMobileMenu from "./__HeaderMobileMenu";
import HeaderNav from "./__HeaderNav";
import LanguageSwitch from "./__LanguageSwitch";

import { HEADER_NAV_ITEMS } from "./__const";

import style from "./__style.module.scss";

const Header = (): JSX.Element => (
  <Container component="header">
    <div className={style.header}>
      {/* <Logo /> */}
      <LanguageSwitch />
      <HeaderNav navItems={HEADER_NAV_ITEMS} />
      <HeaderCartButton />
      <HeaderMobileMenu navItems={HEADER_NAV_ITEMS} />
    </div>
  </Container>
);

Header.displayName = "Header";

export default Header;
