import { MouseEventHandler, ReactNode, useCallback, useState } from "react";
import classNames from "classnames";
import { CircularProgress } from "@mui/material";
import type { ButtonSize, ButtonType, ButtonVariant } from "./__types";

import style from "./__style.module.scss";

const getButtonVariant = (v: ButtonVariant): null | string => {
  switch (v) {
    case "primary":
      return style.button_primary;
    case "secondary":
      return style.button_secondary;
    case "text":
      return style.button_text;
    default:
      return null;
  }
};

const getButtonClickedVariant = (v: ButtonVariant): null | string => {
  switch (v) {
    case "primary":
      return style["button_primary-clicked"];
    case "secondary":
      return style["button_secondary-clicked"];
    case "text":
      return style["button_text-clicked"];
    default:
      return null;
  }
};

const getButtonSize = (v: ButtonSize): null | string => {
  switch (v) {
    case "small":
      return style.button_small;
    case "medium":
      return style.button_medium;
    case "large":
      return style.button_large;
    default:
      return null;
  }
};

const Button = ({
  children,
  variant = "primary",
  icon = false,
  type = "button",
  className,
  ariaLabel,
  title,
  disabled,
  isLoading,
  size = "medium",
  fullWidth,
  onClick,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: boolean;
  type?: ButtonType;
  className?: string;
  ariaLabel?: string;
  title?: string;
  disabled?: boolean;
  isLoading?: boolean;
  size?: ButtonSize;
  fullWidth?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 130);

      if (onClick) {
        onClick(event); // Invoke the provided onClick prop, passing the event object
      }
    },
    [onClick],
  );
  return (
    <button
      className={classNames(
        isClicked && getButtonClickedVariant(variant),
        className,
        getButtonVariant(variant),
        getButtonSize(size),
        icon && style.button_icon,
        fullWidth && style.button_fullWidth,
        style.button,
      )}
      onClick={handleClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      aria-label={ariaLabel}
      title={title}
      disabled={disabled}
    >
      {isLoading && (
        <CircularProgress
          size={18}
          color="secondary"
        />
      )}
      {children}
    </button>
  );
};

Button.displayName = Button;

export default Button;
