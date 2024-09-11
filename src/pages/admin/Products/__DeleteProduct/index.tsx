import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAuth } from "lib/auth/admin/AuthContext";
import { useCallback, useState } from "react";
import DeleteProductModal from "./__DeleteProductModal";

const DeleteProduct = ({
  productId,
  productName,
  reload,
}: {
  productId: number;
  productName: string;
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
      <DeleteProductModal
        productId={productId}
        productName={productName}
        token={token}
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={reload}
      />
    </>
  );
};

DeleteProduct.displayName = "DeleteProduct";

export default DeleteProduct;
