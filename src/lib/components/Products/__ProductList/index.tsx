import Typography from "lib/ui/Typography";
import type { CategoryProps } from "lib/category/types";
import type { ProductProps, ProductSectionProps } from "lib/product/types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import ProductSection from "./__ProductSection";

import styles from "./__style.module.scss";

const ProductList = ({
  categories,
  products,
}: {
  categories: ReadonlyArray<CategoryProps>;
  products: ReadonlyArray<ProductProps>;
}): JSX.Element => {
  // map categories and products and create an array of categories with their ids, names and products into one array
  const { t } = useTranslation();
  const productSections = useMemo(() => {
    const sections: Array<ProductSectionProps> = [];

    categories.forEach(category => {
      const productsByCategory = products.filter(
        product => product.categoryId === category.id,
      );

      if (productsByCategory.length) {
        sections.push({
          categoryId: category.id,
          categoryName: category.name,
          products: productsByCategory,
          pinned: category.pinned,
        });
      }
    });

    return sections;
  }, [categories, products]);

  return (
    <>
      <div className={styles["table-head"]}>
        <Typography
          variant="body2"
          component="span"
          color="secondary"
        >
          {t("item")}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          color="secondary"
        >
          {t("available")}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          color="secondary"
        >
          {t("price")}
        </Typography>
      </div>
      {productSections.map(section => (
        <ProductSection
          key={section.categoryId}
          categoryName={section.categoryName}
          products={section.products}
          pinned={section.pinned}
        />
      ))}
    </>
  );
};

ProductList.displayName = "ProductList";

export default ProductList;
