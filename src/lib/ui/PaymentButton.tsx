import { MouseEventHandler, useCallback, useState } from "react";
import classNames from "classnames";
import { CircularProgress } from "@mui/material";
import type { PaymentButtonVariant, SupportedIcon } from "./__types";

import style from "./__style.module.scss";
import Typography from "./Typography";
import Icon from "./Icon";

const getPaymentButtonVariant = (v: PaymentButtonVariant): null | string => {
  switch (v) {
    case "bitcoin":
      return style["payment-button_bitcoin"];
    case "card":
      return style["payment-button_card"];
    case "usdt":
      return style["payment-button_usdt"];
    default:
      return null;
  }
};

const getPaymentButtonClickedVariant = (
  v: PaymentButtonVariant,
): null | string => {
  switch (v) {
    case "bitcoin":
      return style["payment-button_bitcoin-clicked"];
    case "card":
      return style["payment-button_card-clicked"];
    case "usdt":
      return style["payment-button_usdt-clicked"];
    default:
      return null;
  }
};

const getPaymentButtonLabel = (v: PaymentButtonVariant): null | string => {
  switch (v) {
    case "bitcoin":
      return "Bitcoin";
    case "card":
      return "Mono&Privat";
    case "usdt":
      return "USDT TRC-20";
    default:
      return null;
  }
};
const PaymentButton = ({
  variant,
  className,
  disabled,
  isLoading,
  onClick,
}: {
  variant: PaymentButtonVariant;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
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
        isClicked && getPaymentButtonClickedVariant(variant),
        className,
        getPaymentButtonVariant(variant),
        style["payment-button"],
      )}
      type="button"
      onClick={handleClick}
      aria-label={`Кнопка оплаты с помощью ${getPaymentButtonLabel(variant)}`}
      disabled={disabled}
    >
      {isLoading && (
        <CircularProgress
          size={18}
          color="secondary"
        />
      )}
      <Icon icon={variant as SupportedIcon} />
      <Typography
        component="span"
        variant="body3bold"
      >
        {getPaymentButtonLabel(variant)}
      </Typography>
    </button>
  );
};

PaymentButton.displayName = "PaymentButton";

export default PaymentButton;
