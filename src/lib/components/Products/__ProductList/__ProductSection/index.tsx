import Typography from "lib/ui/Typography";
import Icon from "lib/ui/Icon"; // Assuming Icon is correctly set to use icons like 'star'

import type { ProductSectionProps } from "lib/product/types";
import Product from "./__Product";
import style from "./__style.module.scss";

type ExtendedProductSectionProps = Omit<ProductSectionProps, "categoryId"> & {
  pinned?: boolean;
};

const ProductSection = ({
  categoryName,
  products,
  pinned,
}: ExtendedProductSectionProps): JSX.Element => (
  <section className={style["product-section"]}>
    <div className={style.header}>
      {pinned && (
        <Icon
          className={style.icon}
          icon="star"
        />
      )}
      <Typography
        variant="body2bold"
        component="h4"
      >
        {categoryName}
      </Typography>
    </div>
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            shortDescription={product.shortDescription}
            detailedDescription={product.detailedDescription}
            supplierContact={product.supplierContact}
            media={product.media}
            country={product.country}
            price={product.price}
            quantity={product.quantity}
          />
        </li>
      ))}
    </ul>
  </section>
);

ProductSection.displayName = "ProductSection";

export default ProductSection;
