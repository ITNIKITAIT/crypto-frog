import type { ProductProps } from "lib/product/types";

import { useCategories } from "lib/category/useCategories";

import { CircularProgress, Alert } from "@mui/material";
import Modal from "lib/ui/Modal";
import EditProductForm from "./__EditProductForm";

const EditProductModal = ({
  product,
  isModalOpen,
  onClose,
  onSuccess,
}: {
  product: ProductProps;
  isModalOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}): JSX.Element => {
  const { categories, isLoading, error } = useCategories();
  return (
    <Modal
      open={isModalOpen}
      title="Редактировать товар"
      onClose={onClose}
    >
      {isLoading && <CircularProgress />}
      {error && <Alert>Не удалось загрузить категории</Alert>}
      {categories && categories.length !== 0 && (
        <EditProductForm
          product={product}
          categories={categories}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      )}
    </Modal>
  );
};

EditProductModal.displayName = "EditProductModal";

export default EditProductModal;
