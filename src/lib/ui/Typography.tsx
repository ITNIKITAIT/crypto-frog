import classNames from "classnames";

import type { ReactNode } from "react";

import style from "./__style.module.scss";

export type TypographyComponent =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span"
  | "p";

export type TypographyVariant =
  | "title1"
  | "title2"
  | "body1"
  | "body2"
  | "body2bold"
  | "body3"
  | "body3bold"
  | "body4"
  | "body5"
  | "copyright";

export type TypographyColor = "primary" | "secondary" | "error" | "inherit";

const getVariantClass = (v: TypographyVariant): null | string => {
  switch (v) {
    case "title1":
      return style.typography_title1;
    case "title2":
      return style.typography_title2;
    case "body1":
      return style.typography_body1;
    case "body2":
      return style.typography_body2;
    case "body2bold":
      return style.typography_body2bold;
    case "body3":
      return style.typography_body3;
    case "body3bold":
      return style.typography_body3bold;
    case "body4":
      return style.typography_body4;
    case "body5":
      return style.typography_body5;
    case "copyright":
      return style.typography_copyright;
    default:
      return null;
  }
};

const Typography = ({
  children,
  className,
  component = "p",
  variant = "body1",
  color = "primary",
}: {
  children: ReactNode;
  className?: string;
  component?: TypographyComponent;
  variant?: TypographyVariant;
  color?: TypographyColor;
}): JSX.Element => {
  const Component = component;
  return (
    <Component
      className={classNames(
        className,
        getVariantClass(variant),
        style.typography,
        style[`typography_color_${color}`],
      )}
    >
      {children}
    </Component>
  );
};

Typography.displayName = "Typography";

export default Typography;
