import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAuth } from "lib/auth/admin/AuthContext";
import { useCallback, useState } from "react";
import DeletePromocodeModal from "./__DeletePromocodeModal";

const DeletePromocode = ({
  promocodeId,
  promocodeName,
  reload,
}: {
  promocodeId: number;
  promocodeName: string;
  reload: () => void;
}): JSX.Element => {
  const { token } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <IconButton onClick={handleModalOpen}>
        <Delete />
      </IconButton>
      <DeletePromocodeModal
        promocodeId={promocodeId}
        promocodeName={promocodeName}
        token={token}
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={reload}
      />
    </>
  );
};

DeletePromocode.displayName = "DeletePromocode";

export default DeletePromocode;
