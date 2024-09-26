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
// import type { CategoryProps } from "lib/category/types";
// import Icon from "lib/ui/Icon";
import { useCallback } from "react";
import DeletePromocode from "./__DeletePromocode";
import EditPromocode from "./__EditPromocode";
// import style from "./__style.module.scss";
import { IProcomodeItem } from "./types";

const PromocodeTable = ({
  promocodes,
  reload,
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
}: {
  promocodes: ReadonlyArray<IProcomodeItem>;
  reload: () => void;
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
            <TableCell size="small" />
            <TableCell size="small">
              <b>Название</b>
            </TableCell>
            <TableCell size="small">
              <b>Скидка</b>
            </TableCell>
            <TableCell size="small">
              <b>Количество</b>
            </TableCell>
            <TableCell size="small" />
          </TableRow>
        </TableHead>
        <TableBody>
          {promocodes.map(code => (
            <TableRow key={code.id}>
              <TableCell size="small">
                <EditPromocode
                  promocode={code}
                  reload={reload}
                />
              </TableCell>
              <TableCell size="small">{code.code}</TableCell>
              <TableCell size="small">{code.amount}%</TableCell>
              <TableCell size="small">{code.usageCount}</TableCell>
              <TableCell
                size="small"
                align="right"
              >
                <DeletePromocode
                  promocodeId={code.id}
                  promocodeName={code.code}
                  reload={reload}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        labelRowsPerPage="Промокодов на странице"
        count={totalPages}
        page={page}
        rowsPerPage={limit}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeLimit}
      />
    </TableContainer>
  );
};
PromocodeTable.displayName = "PromocodeTableTable";

export default PromocodeTable;
