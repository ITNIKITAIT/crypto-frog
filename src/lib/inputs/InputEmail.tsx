import React, { useCallback } from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

type EmailInputProps = {
  value: string; // Опциональный пропс для внешнего управления
  onChange: (value: string) => void; // Опциональный пропс для внешнего обработчика
  error: boolean; // Опциональный пропс для внешнего управления
  onError: (error: boolean) => void; // Опциональный пропс для внешнего обработчика
};

const InputEmail: React.FC<EmailInputProps> = ({
  value,
  error,
  onChange,
  onError,
}) => {
  const validateEmail = (inputValue: string): boolean => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
    return re.test(inputValue) && inputValue.length <= 255;
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const inputValue = event.target.value;
      onError(!validateEmail(inputValue));
      onChange(inputValue);
    },
    [onChange, onError],
  );
  const { t } = useTranslation();

  return (
    <TextField
      id="email"
      label={t("email")}
      variant="standard"
      fullWidth
      required
      value={value}
      onChange={handleChange}
      error={error}
      helperText={error ? t("email-warning") : ""}
    />
  );
};

export default InputEmail;
