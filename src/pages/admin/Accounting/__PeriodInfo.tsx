import { Box } from "@mui/material";
import numberToUsd from "lib/price/numberToUsd";
import Typography from "lib/ui/Typography";
import { round } from "lib/utils/round";

const PeriodInfo = ({
  totalSell,
  totalIncome,
}: {
  totalSell: number;
  totalIncome: number;
}): JSX.Element => (
  <Box
    pt={1}
    pb={2}
  >
    <Typography variant="body1">Статистика за указанный период дат:</Typography>
    <ul>
      <li>
        <Typography variant="body2bold">
          Общая сумма дохода за указанный период:{" "}
          {numberToUsd(round(totalSell, 2))}
        </Typography>
      </li>
      <br />
      <li>
        <Typography variant="body2bold">
          Общая сумма прибыли за указанный период:{" "}
          {numberToUsd(round(totalIncome, 2))}
        </Typography>
      </li>
    </ul>
  </Box>
);

PeriodInfo.displayName = "PeriodInfo";

export default PeriodInfo;
