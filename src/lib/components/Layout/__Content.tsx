import type { ReactNode } from "react";

import Cart from "../Cart";

import style from "./__style.module.scss";
// import cosmo from "../../../assets/illustrations/hyperspace-backgroundnnel.png";

const Content = ({ children }: { children: ReactNode }): JSX.Element => (
  <>
    <div className={style.main}>
      {children}
      <Cart />
    </div>
  </>
);

Content.displayName = "Content";

export default Content;
