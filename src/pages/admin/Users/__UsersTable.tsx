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
import type { ProfileProps } from "lib/profile/types";
import { useCallback } from "react";
import TableItem from "./__TableItem";

const UsersTable = ({
  users,
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
  reload,
}: {
  users: ReadonlyArray<ProfileProps>;
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
            <TableCell size="small">
              <b>ID</b>
            </TableCell>
            <TableCell size="small">
              <b>Username</b>
            </TableCell>
            <TableCell size="small">
              <b>Статус</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableItem
              user={user}
              reload={reload}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        labelRowsPerPage="Пользователей на странице"
        count={totalPages}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeLimit}
      />
    </TableContainer>
  );
};

UsersTable.displayName = "UsersTable";

export default UsersTable;
