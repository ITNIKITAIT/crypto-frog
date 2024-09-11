import React, { useCallback } from "react";
import { Button, Box } from "@mui/material";

import style from "./__style.module.scss";

type NumberInputProps = {
  className?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

const NumberInput: React.FC<NumberInputProps> = ({
  className,
  value,
  min = -Infinity,
  max = Infinity,
  onChange,
}) => {
  const handleIncrement = useCallback(() => {
    if (value < max) {
      onChange(value + 1);
    }
  }, [value, max, onChange]);

  const handleDecrement = useCallback(() => {
    if (value > min) {
      onChange(value - 1);
    }
  }, [min, onChange, value]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = parseInt(event.target.value, 10);
      if (Number.isNaN(newValue)) {
        newValue = 0;
      } else if (newValue < min) {
        newValue = min;
      } else if (newValue > max) {
        newValue = max;
      }
      onChange(newValue);
    },
    [max, min, onChange],
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        border: "1px solid",
        borderRadius: 8,
      }}
      className={className}
    >
      <Button
        onClick={handleDecrement}
        disabled={value <= min}
        sx={{
          borderRadius: 10,
        }}
        className={style.button}
      >
        -
      </Button>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        style={{ textAlign: "center", verticalAlign: "middle" }}
        className={style.input}
      />
      <Button
        onClick={handleIncrement}
        disabled={value >= max}
        sx={{
          borderRadius: 10,
        }}
        className={style.button}
      >
        +
      </Button>
    </Box>
  );
};

export default NumberInput;
