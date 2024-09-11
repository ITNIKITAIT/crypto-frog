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
import DeletePromocode from "./__DeletePromocode";
import EditPromocode from "./__EditPromocode";
// import style from "./__style.module.scss";
import { IProcomodeItem } from "./types";

const PromocodeTable = ({
  promocodes,
  reload,
}: {
  promocodes: ReadonlyArray<IProcomodeItem>;
  reload: () => void;
}): JSX.Element => {
  const handleChangePage = () => {};
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
              <TableCell size="small">{code.name}</TableCell>
              <TableCell size="small">{code.discount}%</TableCell>
              <TableCell size="small">{code.numberOfUses}</TableCell>
              <TableCell
                size="small"
                align="right"
              >
                <DeletePromocode
                  promocodeId={code.id}
                  promocodeName={code.name}
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
        count={10}
        page={0}
        rowsPerPage={10}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};
PromocodeTable.displayName = "PromocodeTableTable";

export default PromocodeTable;
