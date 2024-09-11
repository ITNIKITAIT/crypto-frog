import type { ReactNode } from "react";

import { ThemeProvider } from "@mui/material";
import { CartProvider } from "lib/cart/context";
import { CartItemsProvider } from "lib/cart/items-context";
import Container from "lib/ui/Container";

import { theme } from "lib/ui/theme";
import Header from "./__Header";
import Footer from "./__Footer";
import Content from "./__Content";

import style from "./__style.module.scss";

const Layout = ({
  children,
  hideLayout,
}: {
  children: ReactNode;
  hideLayout?: boolean;
}): JSX.Element => (
  <ThemeProvider theme={theme}>
    <CartProvider>
      <CartItemsProvider>
        <div className={style.layout}>
          <div className={style.gradientBlock} />

          <div className={style.content}>
            {!hideLayout && <Header />}
            <Container component="main">
              <Content>{children}</Content>
            </Container>
          </div>
          {!hideLayout && <Footer className={style.footer} />}
        </div>
      </CartItemsProvider>
    </CartProvider>
  </ThemeProvider>
);

Layout.displayName = Layout;

export default Layout;
