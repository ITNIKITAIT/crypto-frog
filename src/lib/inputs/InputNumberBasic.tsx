import type { ChangeEvent, FC } from "react";

import TextField from "@mui/material/TextField";
import { useCallback } from "react";

type InputNumberProps = {
  id: string;
  label?: string;
  value: number;
  min?: number;
  max?: number;
  required?: boolean;
  integerOnly?: boolean;
  helperText?: string;
  step?: number | "any";
  maxWidth?: number;
  size?: "small" | "medium";
  helperTextNoGutters?: boolean;
  onChange: (value: null | number) => void;
};

const InputNumber: FC<InputNumberProps> = ({
  id,
  label,
  value,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  integerOnly = false,
  step = integerOnly ? 1 : "any",
  required = false,
  helperText = "",
  maxWidth,
  helperTextNoGutters = false,
  size = "medium",
  onChange,
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      // Удаляем начальные нули и проверяем, что оставшееся значение является числом
      // inputValue = inputValue.replace(/^0+/, "");
      // if (!inputValue.match(/^\d*(\.\d+)?$/)) {
      //   return; // Если ввод не является числом, не делаем ничего
      // }

      // // Проверяем, пустая ли строка
      // if (inputValue === "") {
      //   onChange(min); // Устанавливаем минимальное значение
      //   return;
      // }
      // Проверяем, пустая ли строка

      if (!/^\d*\.?\d{0,2}$/.test(inputValue)) {
        return;
      }
      if (inputValue === "") {
        onChange(min); // Устанавливаем минимальное значение
        return;
      }

      if (inputValue === "") {
        onChange(null); // Устанавливаем значение в null, если поле пустое
        return;
      }

      let numericValue = integerOnly
        ? parseInt(inputValue, 10)
        : parseFloat(inputValue);

      // Проверяем, является ли число допустимым числовым значением
      if (!Number.isNaN(numericValue)) {
        numericValue = Math.max(min, Math.min(numericValue, max));
        onChange(numericValue);
      }
    },
    [integerOnly, max, min, onChange],
  );

  return (
    <TextField
      fullWidth={!maxWidth}
      sx={{
        maxWidth,
      }}
      id={id}
      required={required}
      size={size}
      type="number"
      label={label}
      value={value}
      InputProps={{
        inputProps: {
          min,
          max,
          step,
        },
      }}
      helperText={helperText}
      FormHelperTextProps={{
        sx: helperTextNoGutters ? { ml: 0, mr: 0 } : {}, // Условно применяем стили
      }}
      onChange={handleChange}
    />
  );
};

InputNumber.displayName = "InputNumber";

export default InputNumber;
