import { useState, useCallback, Fragment } from "react";

import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import type { ProductProps } from "lib/product/types";
import EditProductModal from "./__EditProductModal";

const EditProduct = ({
  product,
  reload,
}: {
  product: ProductProps;
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
      <EditProductModal
        product={product}
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={reload}
      />
    </Fragment>
  );
};

EditProduct.displayName = "EditProduct";

export default EditProduct;
