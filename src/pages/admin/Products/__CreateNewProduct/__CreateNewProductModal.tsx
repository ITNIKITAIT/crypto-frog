import { Alert, Box, CircularProgress } from "@mui/material";

import Modal from "lib/ui/Modal";
import { useCategories } from "lib/category/useCategories";
import CreateNewCategoryForm from "./__CreateNewProductForm";

const CreateNewProductModal = ({
  isModalOpen,
  onClose,
  onSuccess,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}): JSX.Element => {
  const { categories, isLoading, error } = useCategories();

  return (
    <Modal
      open={isModalOpen}
      title="Добавить товар"
      onClose={onClose}
    >
      {isLoading && <CircularProgress />}
      {error && <Alert>Не удалось загрузить категории</Alert>}
      {categories && categories.length !== 0 ? (
        <CreateNewCategoryForm
          categories={categories}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      ) : (
        <Box p={2}>Нет категорий</Box>
      )}
    </Modal>
  );
};

CreateNewProductModal.displayName = "Modal";

export default CreateNewProductModal;
