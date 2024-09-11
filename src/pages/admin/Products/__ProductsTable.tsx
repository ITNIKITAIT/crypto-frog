import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import type { ProductProps } from "lib/product/types";
import { useCallback } from "react";
import TableItem from "./__TableItem";

const ProductsTable = ({
  products,
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
  reload,
}: {
  products: ReadonlyArray<ProductProps>;
  page: number;
  totalPages: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  reload: () => void;
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
            <TableCell size="small" />
            <TableCell size="small" />
            <TableCell size="small" />
            <TableCell size="small">
              <b>Номер</b>
            </TableCell>
            <TableCell size="small">
              <b>Название</b>
            </TableCell>
            <TableCell size="small">
              <b>Цена, USD</b>
            </TableCell>
            <TableCell size="small">
              <b>Количество</b>
            </TableCell>
            <TableCell size="small">
              <b>Общая цена, USD</b>
            </TableCell>
            <TableCell size="small" />
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => (
            <TableItem
              key={product.id}
              product={product}
              reload={reload}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        labelRowsPerPage="Товаров на странице"
        count={totalPages}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeLimit}
      />
    </TableContainer>
  );
};

ProductsTable.displayName = "ProductsTable";

export default ProductsTable;
