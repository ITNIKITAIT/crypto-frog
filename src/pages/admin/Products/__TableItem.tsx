import { TableRow, TableCell } from "@mui/material";
import type { ProductProps } from "lib/product/types";
import { round } from "lib/utils/round";
import { useState, useCallback, Fragment } from "react";
import numberToUsd from "lib/price/numberToUsd";
import AddKeys from "./__AddKeys";
import DeleteProduct from "./__DeleteProduct";
import EditProduct from "./__EditProduct";
import ProductInfoModal from "./__ProductInfoModal";
import DownloadKeys from "./__DownloadKeys";

const TableItem = ({
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
      <TableRow
        hover
        sx={{
          cursor: "pointer",
        }}
      >
        <TableCell size="small">
          <EditProduct
            product={product}
            reload={reload}
          />
        </TableCell>
        <TableCell size="small">
          <AddKeys
            productId={product.id}
            productName={product.name}
            reload={reload}
          />
        </TableCell>
        <TableCell size="small">
          <DownloadKeys
            productId={product.id}
            productName={product.name}
            availableKeysQuantity={product.quantity}
            reload={reload}
          />
        </TableCell>
        <TableCell
          size="small"
          onClick={handleModalOpen}
        >
          {product.id}
        </TableCell>
        <TableCell
          size="small"
          onClick={handleModalOpen}
        >
          {product.name}
        </TableCell>
        <TableCell
          size="small"
          onClick={handleModalOpen}
        >
          {product.price}
        </TableCell>
        <TableCell
          size="small"
          onClick={handleModalOpen}
        >
          {product.quantity}
        </TableCell>
        <TableCell
          size="small"
          onClick={handleModalOpen}
        >
          {numberToUsd(round(product.totalPrice, 2))}
        </TableCell>
        <TableCell size="small">
          <DeleteProduct
            productId={product.id}
            productName={product.name}
            reload={reload}
          />
        </TableCell>
      </TableRow>
      <ProductInfoModal
        product={product}
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </Fragment>
  );
};

TableItem.displayName = "TableItem";

export default TableItem;
