import { useState, useCallback, Fragment } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";
import { useAuth } from "lib/auth/admin/AuthContext";
import DownloadKeysModal from "./__DownloadKeysModal";

const DownloadKeys = ({
  productId,
  productName,
  availableKeysQuantity,
  reload,
}: {
  productId: number;
  productName: string;
  availableKeysQuantity: number;
  reload: () => void;
}): JSX.Element => {
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <Fragment>
      <IconButton
        onClick={handleModalOpen}
        aria-label="Выгрузить ключи"
      >
        <DownloadIcon />
      </IconButton>
      <DownloadKeysModal
        productId={productId}
        productName={productName}
        availableKeysQuantity={availableKeysQuantity}
        isModalOpen={isModalOpen}
        token={token}
        onClose={handleModalClose}
        onSuccess={reload}
      />
    </Fragment>
  );
};

DownloadKeys.displayName = "DownloadKeys";

export default DownloadKeys;
