import classNames from "classnames";
import type { ReactNode } from "react";
import type { ContainerComponent } from "./__types";

import style from "./__style.module.scss";

const Container = ({
  component = "div",
  children,
  className,
}: {
  children: ReactNode;
  component?: ContainerComponent;
  className?: string;
}): JSX.Element => {
  const Component = component;
  return (
    <Component className={classNames(className, style.container)}>
      {children}
    </Component>
  );
};

Container.displayName = "Container";

export default Container;
