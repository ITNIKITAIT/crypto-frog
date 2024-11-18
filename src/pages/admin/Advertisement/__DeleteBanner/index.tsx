import Button from "lib/ui/Button";
import { useAuth } from "lib/auth/admin/AuthContext";
import { useCallback, useState } from "react";
import DeleteCategoryModal from "./__DeleteBannerModal";
import styles from "./__style.module.scss";

const DeleteBanner = ({
  reset,
  isExists,
}: {
  reset: () => void;
  isExists: boolean;
}): JSX.Element => {
  const { token } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);
  const reload = () => {
    setIsModalOpen(false);
    reset();
  };
  return (
    <>
      <Button
        disabled={!isExists}
        onClick={handleModalOpen}
        variant="secondary"
        className={styles.delete_btn}
      >
        Удалить
      </Button>
      <DeleteCategoryModal
        token={token}
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={reload}
      />
    </>
  );
};

DeleteBanner.displayName = "DeleteCategory";

export default DeleteBanner;
