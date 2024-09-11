import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { useAuth } from "lib/auth/admin/AuthContext";
import { useNavigate } from "react-router-dom";
import type { AccountantItemProps } from "lib/accountant/types";
import numberToUsd from "lib/price/numberToUsd";
import { round } from "lib/utils/round";

const AccountantTable = ({
  items,
  error,
  isLoading,
}: {
  items: null | ReadonlyArray<AccountantItemProps>;
  error: null | AxiosError;
  isLoading: boolean;
}): JSX.Element => {
  const { setToken } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (error !== null) {
      setToken(null);
      localStorage.removeItem("authToken");
      navigate("/xxxopernDyn5fYk/admin/login");
    }
  }, [navigate, error, setToken]);

  if (isLoading || items === null) {
    return (
      <CircularProgress
        color="secondary"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell size="small">
              <b>ID товара</b>
            </TableCell>
            <TableCell size="small">
              <b>Название товара</b>
            </TableCell>
            <TableCell size="small">
              <b>Кол-во покупок</b>
            </TableCell>
            <TableCell size="small">
              <b>Сумма продаж</b>
            </TableCell>
            <TableCell size="small">
              <b>Сумма прибыли</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.itemId}>
              <TableCell size="small">{item.itemId}</TableCell>
              <TableCell size="small">{item.itemName}</TableCell>
              <TableCell size="small">{item.quantity}</TableCell>
              <TableCell size="small">
                {numberToUsd(round(item.sell, 2))}
              </TableCell>
              <TableCell size="small">
                {numberToUsd(round(item.income, 2))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

AccountantTable.displayName = "AccountantTable";

export default AccountantTable;
