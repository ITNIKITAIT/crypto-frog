import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Button from "lib/ui/Button";
import { useCallback, useState } from "react";

const TimerangePicker = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}: {
  fromDate: string;
  toDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
}): JSX.Element => {
  const [localFromDate, setLocalFromDate] = useState<string>(fromDate);
  const [localToDate, setLocalToDate] = useState<string>(toDate);

  const handleFromDateChange = useCallback(
    (value: any) => {
      const year = value.$y;
      const month = value.$M + 1; // Месяцы начинаются с 0, поэтому добавляем 1
      const day = value.$D;

      const yearStr = year.toString();
      const monthStr = month < 10 ? `0${month}` : month.toString();
      const dayStr = day < 10 ? `0${day}` : day.toString();

      const formattedDate = `${yearStr}-${monthStr}-${dayStr}T00:00:00`;

      setLocalFromDate(formattedDate);
    },
    [setLocalFromDate],
  );

  const handleToDateChange = useCallback(
    (value: any) => {
      const year = value.$y;
      const month = value.$M + 1; // Месяцы начинаются с 0, поэтому добавляем 1
      const day = value.$D;

      const yearStr = year.toString();
      const monthStr = month < 10 ? `0${month}` : month.toString();
      const dayStr = day < 10 ? `0${day}` : day.toString();

      const formattedDate = `${yearStr}-${monthStr}-${dayStr}T23:59:59`;

      setLocalToDate(formattedDate);
    },
    [setLocalToDate],
  );

  const handleSubmit = useCallback(() => {
    onFromDateChange(localFromDate);
    onToDateChange(localToDate);
  }, [localFromDate, localToDate, onFromDateChange, onToDateChange]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
      }}
    >
      <DatePicker
        onChange={handleFromDateChange}
        defaultValue={dayjs(fromDate)}
        format="DD.MM.YYYY"
      />
      <DatePicker
        onChange={handleToDateChange}
        defaultValue={dayjs(toDate)}
        format="DD.MM.YYYY"
      />

      <Button onClick={handleSubmit}>Применить</Button>
    </Box>
  );
};

TimerangePicker.displayName = "TimerangePicker";

export default TimerangePicker;
