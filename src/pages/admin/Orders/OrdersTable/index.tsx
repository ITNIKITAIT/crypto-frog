import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import type { OrderProps } from "lib/orders/types";
import { useCallback } from "react";
import OrderItem from "./__OrderItem";

const OrdersTable = ({
  orders,
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
}: {
  orders: ReadonlyArray<OrderProps>;
  page: number;
  totalPages: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
}): JSX.Element => {
  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      onPageChange(newPage);
    },
    [onPageChange],
  );

  const handleChangeLimit = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onLimitChange(parseInt(event.target.value, 10));
    },
    [onLimitChange],
  );

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
              <b>ID</b>
            </TableCell>
            <TableCell size="small">
              <b>Дата</b>
            </TableCell>
            <TableCell size="small">
              <b>Товары</b>
            </TableCell>
            <TableCell size="small">
              <b>Общая сумма</b>
            </TableCell>
            <TableCell size="small">
              <b>Username</b>
            </TableCell>
            <TableCell size="small">
              <b>Способ Оплаты</b>
            </TableCell>
            <TableCell size="small">
              <b>Статус</b>
            </TableCell>
            <TableCell size="small" />
          </TableRow>
        </TableHead>
        <TableBody>
          {orders &&
            orders.map(order => (
              <OrderItem
                key={order.orderId}
                order={order}
              />
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        labelRowsPerPage="Заказов на странице"
        count={totalPages}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeLimit}
      />
    </TableContainer>
  );
};

OrdersTable.displayName = "OrdersTable";

export default OrdersTable;
