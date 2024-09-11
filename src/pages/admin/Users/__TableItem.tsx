import type { ProfileProps } from "lib/profile/types";

import { Fragment, useCallback, useState } from "react";

import { TableRow, TableCell } from "@mui/material";
import UserProfileModal from "./__UserProfileModal";

const TableItem = ({
  user,
  reload,
}: {
  user: ProfileProps;
  reload: () => void;
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);
  return (
    <Fragment>
      <TableRow
        hover
        sx={{
          cursor: "pointer",
        }}
        onClick={handleModalOpen}
      >
        <TableCell size="small">{user.id}</TableCell>
        <TableCell size="small">{user.email}</TableCell>
        <TableCell
          size="small"
          sx={{
            color: user.banned ? "#ef5350" : "#4caf50",
          }}
        >
          {user.banned ? "Забанен" : "Активен"}
        </TableCell>
      </TableRow>

      <UserProfileModal
        user={user}
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={reload}
      />
    </Fragment>
  );
};

TableItem.displayName = "TableItem";

export default TableItem;
