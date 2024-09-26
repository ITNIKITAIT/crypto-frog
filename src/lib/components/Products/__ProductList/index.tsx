import Typography from "lib/ui/Typography";
import type { CategoryProps } from "lib/category/types";
import type { ProductProps, ProductSectionProps } from "lib/product/types";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import ProductSection from "./__ProductSection";

import styles from "./__style.module.scss";
import { useFilter } from "../__context";

const ProductList = ({
  categories,
  products,
}: {
  categories: ReadonlyArray<CategoryProps>;
  products: ReadonlyArray<ProductProps>;
}): JSX.Element => {
  // map categories and products and create an array of categories with their ids, names and products into one array
  const { t } = useTranslation();
  const { selectedCountries, setProducts, selectedCategories } = useFilter();
  const [searchParams] = useSearchParams();
  const countriesParams = searchParams.get("countries");
  const productSections = useMemo(() => {
    const sections: Array<ProductSectionProps> = [];

    categories.forEach(category => {
      const productsByCategory = products.filter(
        product => product.categoryId === category.id,
      );
      const productsByCountry = products.filter(product =>
        selectedCountries.includes(product.country as string),
      );

      let totalProducts: ProductProps[] = [];

      if (productsByCategory.length) totalProducts = productsByCategory;
      if (productsByCountry.length) totalProducts = productsByCountry;

      if (productsByCountry.length && productsByCountry.length) {
        totalProducts = productsByCategory.filter(categoryProduct =>
          productsByCountry.some(
            countryProduct => countryProduct.id === categoryProduct.id,
          ),
        );
      }

      if (totalProducts.length) {
        sections.push({
          categoryId: category.id,
          categoryName: category.name,
          products: totalProducts,
          pinned: category.pinned,
        });
      }
    });

    return sections;
  }, [categories, products, selectedCountries]);

  useEffect(() => {
    if (selectedCategories.length) {
      const filteredByCategory = products.filter(product =>
        selectedCategories.includes(product.categoryId),
      );
      setProducts(filteredByCategory);
    } else {
      setProducts(products as ProductProps[]);
    }
  }, [
    productSections,
    setProducts,
    countriesParams,
    products,
    selectedCategories,
  ]);

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
