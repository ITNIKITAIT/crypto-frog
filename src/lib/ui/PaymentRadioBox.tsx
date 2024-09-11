import React, { useState, useCallback, ChangeEventHandler } from "react";
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

const PaymentRadioButton = ({
  variant,
  className,
  disabled,
  isLoading,
  onChange,
  name,
}: {
  variant: PaymentButtonVariant;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name: string;
}): JSX.Element => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsSelected(event.target.checked);
      if (onChange) {
        onChange(event);
      }
    },
    [onChange],
  );

  const inputId = `payment-radio-${variant}`;

  const getDisplayText = (buttonVariant: PaymentButtonVariant) => {
    // Changed variable name to avoid shadowing
    switch (buttonVariant) {
      case "card":
        return "Mono&Privat";
      case "usdt":
        return "USDT TRC-20";
      default:
        return buttonVariant;
    }
  };

  return (
    <label
      htmlFor={inputId}
      className={classNames(
        className,
        getPaymentButtonVariant(variant),
        style["payment-radio"],
        { [style["payment-button_selected"]]: isSelected },
      )}
    >
      <input
        id={inputId}
        type="radio"
        name={name}
        value={variant}
        onChange={handleChange}
        disabled={disabled}
        aria-label={`Оплата с помощью ${getDisplayText(variant)}`}
      />
      {isLoading && (
        <CircularProgress
          size={18}
          color="secondary"
        />
      )}
      <Typography
        component="span"
        variant="body3bold"
      >
        {getDisplayText(variant)}
      </Typography>
      <Icon icon={variant as SupportedIcon} />
    </label>
  );
};

PaymentRadioButton.displayName = "PaymentButton";

export default PaymentRadioButton;
