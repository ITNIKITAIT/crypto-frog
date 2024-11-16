import { Box } from "@mui/material";
import type { CategoryProps } from "lib/category/types";
import type { ProductProps } from "lib/product/types";
import { Fragment, useEffect, useState } from "react";
import Typography from "lib/ui/Typography";
import { useTranslation } from "react-i18next";
import {
  getDesktopBanner,
  getMobileBanner,
} from "lib/endpoints/api/user/advertisement/get";
import { IBannerResponse } from "lib/advertisement/types";
import { Link } from "react-router-dom";
import Filters from "./__Filters";
import FiltersButton from "./__FiltersButton";
import ProductList from "./__ProductList";
// import ad from "../../../assets/ad/ad_1.png";
// import ad_mobile from "../../../assets/ad/ad_mobile.png";

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
  const [desktopBanner, setDesktopBanner] = useState<IBannerResponse | null>(
    null,
  );
  const [mobileBanner, setMobileBanner] = useState<IBannerResponse | null>(
    null,
  );

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Получаем баннер для десктопа
        const desktopResponse = await getDesktopBanner();
        setDesktopBanner(desktopResponse.data);

        // Получаем баннер для мобильных устройств
        const mobileResponse = await getMobileBanner();
        setMobileBanner(mobileResponse.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <Fragment>
      {mobileBanner && mobileBanner.linkUrl && (
        <div className={style.advertisement_mobile}>
          <Link
            target="_blank"
            to={mobileBanner.linkUrl}
          >
            <img
              src={`data:image/jpeg;base64,${mobileBanner.image}`}
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
        {desktopBanner && desktopBanner.linkUrl && (
          <div className={style.advertisement}>
            <Link
              target="_blank"
              to={desktopBanner.linkUrl}
            >
              <img
                src={`data:image/jpeg;base64,${desktopBanner.image}`}
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
