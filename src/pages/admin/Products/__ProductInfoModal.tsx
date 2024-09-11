import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { getApiUserCategoryById } from "lib/endpoints/api/user/category/id/get";
import numberToUsd from "lib/price/numberToUsd";
import type { ProductProps } from "lib/product/types";
import Icon from "lib/ui/Icon";
import Modal from "lib/ui/Modal";
import { round } from "lib/utils/round";
import { useState, useCallback, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

const ProductInfoModal = ({
  product,
  isModalOpen,
  onClose,
}: {
  product: ProductProps;
  isModalOpen: boolean;
  onClose: () => void;
}): JSX.Element => {
  const [categoryName, setCategoryName] = useState<null | string>(null);
  const [error, setError] = useState<null | AxiosError>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategoryName = useCallback(async () => {
    try {
      const response = await getApiUserCategoryById({
        id: product.categoryId,
      });
      setCategoryName(response.data.name);
    } catch (_error: unknown) {
      if (_error instanceof AxiosError) {
        setCategoryName(null);
        setError(_error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [product.categoryId]);

  useEffect(() => {
    fetchCategoryName();
  }, [fetchCategoryName]);

  return (
    <Modal
      open={isModalOpen}
      title="Информация о товаре"
      onClose={onClose}
    >
      {isLoading ? (
        <Box
          sx={{
            width: 400,
            height: 500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          px={3}
          pt={2}
          pb={4}
        >
          <Grid
            item
            xs={12}
          >
            <Typography>
              Название товара: <b>{product.name}</b>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography>
              Краткое описание: <b>{product.shortDescription}</b>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography>
              Детальное описание: <b>{product.detailedDescription}</b>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography>
              Контакт Поставщика: <b>{product.supplierContact}</b>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography>
              Цена: <b>{numberToUsd(round(product.price, 2))}</b>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography>
              Доступное кол-во: <b>{product.quantity}</b>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography>
              Общая стоимость:{" "}
              <b>{numberToUsd(round(product.totalPrice, 2))}</b>
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
            xs={12}
          >
            <Typography>Соц. сеть:</Typography>
            <Icon icon={product.media} />
          </Grid>
          {product.country && (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography>Страна:</Typography>
              <ReactCountryFlag
                countryCode={product.country}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                }}
                aria-label={product.country}
                title={product.country}
              />
            </Grid>
          )}
          <Grid
            item
            xs={12}
          >
            <Typography>
              Категория:{" "}
              {error ? (
                "Без категории (Товар не отображается в магазине)"
              ) : (
                <b>{categoryName}</b>
              )}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Modal>
  );
};

ProductInfoModal.displayName = "ProductInfoModal";

export default ProductInfoModal;
