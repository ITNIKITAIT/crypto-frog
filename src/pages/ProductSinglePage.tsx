import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, CircularProgress } from "@mui/material";
import Button from "lib/ui/Button";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Icon from "lib/ui/Icon";
import ReactCountryFlag from "react-country-flag";
import { useCartDispatch } from "lib/cart/context";
import { useCartItemsDispatch } from "lib/cart/items-context";
// import Layout from "../lib/components/Layout";
import Typography from "../lib/ui/Typography";
import { getApiUserItemById } from "../lib/endpoints/api/user/item/id/get";
import type { ProductProps } from "../lib/product/types";
import style from "./__style.module.scss";

const ProductSinglePage = (): JSX.Element => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const cartDispatch = useCartDispatch();
  const cartItemsDispatch = useCartItemsDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const response = await getApiUserItemById({ id: Number(productId) });
          setProduct(response.data);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Error loading product:", error);
          navigate("/*");
        }
      }
    };
    fetchProduct();
  }, [productId, navigate]);

  const handleBuy = useCallback((): void => {
    if (product) {
      cartItemsDispatch({
        type: "FAST_CHECKOUT",
        fastCheckoutItem: {
          id: product.id.toString(),
          title: product.name,
          price: product.price.toString(),
          quantity: product.quantity,
          media: product.media,
          country: product.country,
          quantityInCart: 1,
        },
      });
    }
  }, [product, cartItemsDispatch]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      const { id, name, price, country, media, quantity } = product;

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
    }
  }, [cartDispatch, cartItemsDispatch, product]);

  if (!product) {
    return <CircularProgress />;
  }

  return (
    <div className={style.product__main_div}>
      <Helmet>
        <title>{t("pageproducts")}</title>
      </Helmet>
      <Link
        to="/"
        className={style.product__link}
      >
        <Icon icon="chervon_left" />
        {t("allproducts")}
      </Link>
      <Container
        sx={{
          display: "flex",
          alignItems: { xs: "center", sm: "flex-start" },
          flexDirection: { xs: "column", sm: "row" },
          // gap: "32px",
        }}
        maxWidth="lg"
      >
        <div className={style["product__media-wrapper"]}>
          <Icon
            icon={product.media}
            className={style.product__media}
          />
          {product.country && (
            <ReactCountryFlag
              className={style.product__flag}
              countryCode={product.country}
              style={{ fontSize: "22px" }}
              aria-label={product.country}
            />
          )}
          <div
            className={`${style.product__quantity} ${
              product.media === "google" ||
              product.media === "bing" ||
              product.media === "proxy"
                ? style.product__quantity__google__bing
                : ""
            }`}
          >
            {t("instock")}&nbsp;
            <p className={style.product__quantity__item_text}>
              {product.quantity}
            </p>
          </div>
          <div className={style.price}>
            <Typography variant="body5">
              <strong>
                {t("price")}: {product.price} USD / {t("pcs")}
              </strong>
            </Typography>
          </div>
        </div>
        <div className={style.div__name__description}>
          <div>
            <Typography variant="body5">
              <strong>{product.name}</strong>
            </Typography>
            <Typography
              variant="body5"
              className={style.description}
            >
              <strong>{t("description")}</strong>
            </Typography>
            <Typography variant="body2bold">
              {product.detailedDescription}
            </Typography>
          </div>
        </div>
      </Container>
      <div className={style.product__actions}>
        <Button
          onClick={handleBuy}
          className={style["product__actions-buy"]}
          disabled={product.quantity === 0}
        >
          {t("buy")}
        </Button>
        <Button
          onClick={handleAddToCart}
          variant="secondary"
          className={style["product__actions-cart"]}
          disabled={product.quantity === 0}
        >
          <Icon icon="cart" />
          {t("addtocart")}
        </Button>
      </div>
    </div>
  );
};

ProductSinglePage.displayName = "ProductSinglePage";

export default ProductSinglePage;
