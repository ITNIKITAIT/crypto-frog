import { PlaylistAdd } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState, useCallback, Fragment } from "react";
import AddKeysModal from "./__AddKeysModal";

const AddKeys = ({
  productId,
  productName,
  reload,
}: {
  productId: number;
  productName: string;
  reload: () => void;
}): JSX.Element => {
  const [isAddKeysModalOpen, setIsAddKeysModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsAddKeysModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsAddKeysModalOpen(false), []);

  return (
    <Fragment>
      <IconButton onClick={handleModalOpen}>
        <PlaylistAdd />
      </IconButton>
      <AddKeysModal
        productId={productId}
        productName={productName}
        isAddKeysModalOpen={isAddKeysModalOpen}
        onClose={handleModalClose}
        onSuccess={reload}
      />
    </Fragment>
  );
};

AddKeys.displayName = "AddKeys";

export default AddKeys;
