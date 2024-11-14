import { Box } from "@mui/material";
import type { CategoryProps } from "lib/category/types";
import type { ProductProps } from "lib/product/types";
import { Fragment } from "react";
import Typography from "lib/ui/Typography";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Filters from "./__Filters";
import FiltersButton from "./__FiltersButton";
import ProductList from "./__ProductList";
import ad from "../../../assets/ad/ad_1.png";
import ad_mobile from "../../../assets/ad/ad_mobile.png";

import style from "./__style.module.scss";

const Content = ({
  categories,
  allCategories,
  products,
}: {
  categories: ReadonlyArray<CategoryProps>;
  allCategories: ReadonlyArray<CategoryProps>;
  products: ReadonlyArray<ProductProps>;
}): JSX.Element => {
  const { t } = useTranslation();
  const linkToBigImg = ad;
  const linkToSmallImg = ad_mobile;
  const hyperLink = "/";

  return (
    <Fragment>
      {linkToSmallImg && hyperLink && (
        <div className={style.advertisement_mobile}>
          <Link to={hyperLink}>
            <img
              src={linkToSmallImg}
              alt="ad"
            />
          </Link>
        </div>
      )}
      <div className={style["title-wrapper"]}>
        <Typography
          component="h2"
          variant="title2"
        >
          {t("products")}
        </Typography>
        {linkToBigImg && hyperLink && (
          <div className={style.advertisement}>
            <Link to={hyperLink}>
              <img
                src={linkToBigImg}
                alt="ad"
              />
            </Link>
          </div>
        )}
        <FiltersButton
          products={products}
          categories={allCategories}
        />
      </div>

      <div className={style["products-layout"]}>
        <Box component="aside">
          <Filters
            products={products}
            categories={allCategories}
          />
        </Box>

        <Box>
          <ProductList
            categories={categories}
            products={products}
          />
        </Box>
      </div>
    </Fragment>
  );
};

Content.displayName = "Content";

export default Content;
