import { useCallback } from "react";
import classNames from "classnames";
import Button from "lib/ui/Button";
import Icon from "lib/ui/Icon";
import Typography from "lib/ui/Typography";
import { useCartDispatch } from "lib/cart/context";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import type { ProductSectionProduct } from "lib/product/types";
import { useCartItemsDispatch } from "lib/cart/items-context";
import ReactCountryFlag from "react-country-flag";
import numberToUsd from "lib/price/numberToUsd";
import { round } from "lib/utils/round";
import styles from "./__style.module.scss";

const Product = ({
  id,
  name,
  shortDescription,
  media,
  price,
  country,
  quantity,
}: ProductSectionProduct): JSX.Element => {
  const cartDispatch = useCartDispatch();
  const cartItemsDispatch = useCartItemsDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBuy = useCallback(() => {
    cartItemsDispatch({
      type: "FAST_CHECKOUT",
      fastCheckoutItem: {
        id: id.toString(),
        title: name,
        price: price.toString(),
        quantity,
        media,
        country,
        quantityInCart: 1,
      },
    });
  }, [cartItemsDispatch, country, id, media, name, price, quantity]);

  const handleAddToCart = useCallback(() => {
    cartItemsDispatch({
      type: "ADD",
      item: {
        id: id.toString(),
        title: name,
        price: price.toString(),
        quantity,
        media,
        country,
        quantityInCart: 1,
      },
    });
    cartDispatch({
      step: 1,
      isCartOpen: true,
    });
  }, [
    cartDispatch,
    cartItemsDispatch,
    country,
    id,
    media,
    name,
    price,
    quantity,
  ]);

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      handleProductClick();
    }
  };
  return (
    <div
      className={classNames(styles.product, styles["product-section__product"])}
    >
      <div className={styles["product__media-and-title-wrapper"]}>
        <div className={styles["product__media-wrapper"]}>
          <Icon
            icon={media}
            className={styles.product__media}
          />
          {country && (
            <ReactCountryFlag
              className={styles.product__flag}
              countryCode={country}
              style={{
                fontSize: "22px",
              }}
              aria-label={country}
            />
          )}
        </div>
        <div
          className={styles["product__title-and-description-wrapper"]}
          onClick={handleProductClick}
          onKeyDown={handleKeyPress}
          role="button"
          tabIndex={0}
        >
          <Typography
            className={styles.name}
            variant="body3bold"
            component="h5"
          >
            {name}
          </Typography>
          <Typography
            variant="body3"
            color="secondary"
          >
            {shortDescription}
          </Typography>
        </div>
      </div>
      <div className={styles.product__amount}>
        <Typography
          component="span"
          variant="body4"
          color="secondary"
          className={styles["priduct-price__label"]}
        >
          {t("quantity")}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          className={quantity <= 0 ? styles.product__quantity_empty : ""}
        >
          {quantity > 0 ? quantity : t("notAvailable")}
        </Typography>
      </div>

      <div className={styles.product__price}>
        <Typography
          component="span"
          variant="body4"
          color="secondary"
          className={styles["priduct-price__label"]}
        >
          {t("price")}
        </Typography>
        <Typography
          variant="body2"
          component="span"
        >
          {numberToUsd(round(price, 2))}
        </Typography>
        <Typography
          variant="body3"
          component="span"
          color="secondary"
        >
          {` / ${t("pcs")}`}
        </Typography>
      </div>
      <div className={styles.product__actions}>
        <Button
          onClick={handleBuy}
          className={styles["product__actions-buy"]}
          disabled={quantity === 0}
        >
          {t("buy")}
        </Button>
        <Button
          onClick={handleAddToCart}
          variant="secondary"
          className={styles["product__actions-cart"]}
          disabled={quantity === 0}
        >
          <Icon icon="cart" />
        </Button>

        <svg
          onClick={handleProductClick}
          className={styles.arrowRight_svg}
          width="12"
          height="20"
          viewBox="0 0 12 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.75801 10.0011L0.333008 2.57608L2.45401 0.455078L12 10.0011L2.45401 19.5471L0.333008 17.4261L7.75801 10.0011Z" />
        </svg>
      </div>
    </div>
  );
};

Product.displayName = "Product";

export default Product;
