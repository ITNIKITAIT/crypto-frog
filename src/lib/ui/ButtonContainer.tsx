import classNames from "classnames";

import style from "./__style.module.scss";

const getVariantAlign = (
  v: "left" | "center" | "right" | "between",
): null | string => {
  switch (v) {
    case "left":
      return style["button-container_align-left"];
    case "center":
      return style["button-container_align-center"];
    case "right":
      return style["button-container_align-right"];
    case "between":
      return style["button-container_align-between"];
    default:
      return null;
  }
};

const ButtonContainer = ({
  children,
  align = "right",
  gap,
  className,
}: {
  children: React.ReactNode;
  align?: "left" | "center" | "right" | "between";
  gap?: "sm" | "md" | "lg";
  className?: string;
}): JSX.Element => (
  <div
    className={classNames(
      className,
      getVariantAlign(align),
      style["button-container"],
      gap && style[`button-container_gap-${gap}`],
    )}
  >
    {children}
  </div>
);

ButtonContainer.displayName = "ButtonContainer";

export default ButtonContainer;
