import type { CategoryProps } from "lib/category/types";

import { useState, useCallback, Fragment } from "react";

import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import EditCategoryModal from "./__EditCategoryModal";

const EditCategory = ({
  category,
  reload,
}: {
  category: CategoryProps;
  reload: () => void;
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <Fragment>
      <IconButton onClick={handleModalOpen}>
        <Edit />
      </IconButton>
      <EditCategoryModal
        category={category}
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={reload}
      />
    </Fragment>
  );
};

EditCategory.displayName = "EditCategory";

export default EditCategory;
