import {
  Alert,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Autocomplete,
  type SelectChangeEvent,
} from "@mui/material";
import { AxiosError } from "axios";
import { useAuth } from "lib/auth/admin/AuthContext";
import { useNavigate } from "react-router-dom";
import type { CategoryProps } from "lib/category/types";
import { COUNTRIES_ARRAY } from "lib/country/types";
import { putApiAdminItem } from "lib/endpoints/api/admin/item/put";
import { SUPPORTED_MEDIA_OPTIONS, SupportedMedia } from "lib/media/types";
import { useNotification } from "lib/notification";
import type { ProductProps } from "lib/product/types";
import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import Checkbox from "lib/ui/Checkbox";
import React, { ChangeEvent, Fragment, useCallback, useState } from "react";
import ReactCountryFlag from "react-country-flag";

const EditProductForm = ({
  product,
  categories,
  onClose,
  onSuccess,
}: {
  product: ProductProps;
  categories: ReadonlyArray<CategoryProps>;
  onClose: () => void;
  onSuccess: () => void;
}): JSX.Element => {
  const { token } = useAuth();
  const [newProduct, setNewProduct] = useState({
    name: product.name,
    price: product.price,
    country: product.country,
    media: product.media,
    buyPrice: product.buyPrice,
    quantity: product.quantity,
    totalPrice: product.totalPrice,
    shortDescription: product.shortDescription,
    detailedDescription: product.detailedDescription,
    supplierContact: product.supplierContact,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>(
    product.categoryId.toString(),
  );
  const [telegramOnly, setTelegramOnly] = useState<boolean>(
    product.telegramOnly,
  );

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [shortDescriptionErrorMessage, setShortDescriptionErrorMessage] =
    useState<string>("");
  const [numberPriceErrorMessage, setNumberPriceErrorMessage] =
    useState<string>("");
  const [buyPriceErrorMessage, setBuyPriceErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setNotification } = useNotification();
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setShortDescriptionErrorMessage("");
      setErrorMessage("");
      setNumberPriceErrorMessage("");
      setBuyPriceErrorMessage("");

      if (name === "shortDescription") {
        if (value.length > 255) {
          setShortDescriptionErrorMessage("Текст слишком большой");
          setHasError(true);
        } else {
          setShortDescriptionErrorMessage("");
          setHasError(false);
        }
      }
      if (name === "supplierContact") {
        if (value.length > 255) {
          setErrorMessage("Текст слишком большой");
          setHasError(true);
        } else {
          setErrorMessage("");
          setHasError(false);
        }
      }

      if (name === "price" || name === "buyPrice") {
        if (
          value.startsWith("0") &&
          !value.startsWith("0.") &&
          value.length > 1
        ) {
          setNumberPriceErrorMessage(
            "Число не должно начинаться с нуля, если это не десятичное число",
          );
          setHasError(true);
          return;
        }
        if (value === "" || /^\d*[.,]?\d{0,2}$/.test(value.replace(",", "."))) {
          setNumberPriceErrorMessage("");
          setHasError(false);
        } else {
          setNumberPriceErrorMessage(
            "Ввод допускает только числовые значения, после запятой допускаются только две цифры",
          );
          setHasError(true);
          return;
        }
      }

      setNewProduct(prevState => ({
        ...prevState,
        [name]: value,
      }));

      if (
        name === "buyPrice" &&
        parseFloat(value) >= parseFloat(newProduct.price.toString())
      ) {
        setBuyPriceErrorMessage(
          "Цена закупки должна быть меньше цены продажи.",
        );
        setHasError(true);
      } else {
        setBuyPriceErrorMessage("");
        if (
          name === "price" &&
          parseFloat(newProduct.buyPrice.toString().replace(",", ".")) >=
            parseFloat(value.replace(",", "."))
        ) {
          setBuyPriceErrorMessage(
            "Цена закупки должна быть меньше цены продажи.",
          );
          setHasError(true);
        } else {
          setBuyPriceErrorMessage("");
          setHasError(false);
        }
      }
    },
    [newProduct.buyPrice, newProduct.price],
  );

  const handleCheckboxChange = useCallback(() => {
    setTelegramOnly(!telegramOnly);
  }, [telegramOnly]);

  // const handleSelectedCountryChange = useCallback(
  //   (e: SelectChangeEvent) => {
  //     setNewProduct({
  //       ...newProduct,
  //       country: e.target.value,
  //     });
  //   },
  //   [newProduct],
  // );

  const handleSelectChange = useCallback((e: SelectChangeEvent) => {
    setSelectedCategory(e.target.value);
  }, []);

  const handleSelectedMediaChange = useCallback(
    (e: SelectChangeEvent) => {
      setNewProduct({
        ...newProduct,
        media: e.target.value as SupportedMedia,
      });
    },
    [newProduct],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const response = await putApiAdminItem({
          item: {
            id: product.id,
            name: newProduct.name,
            shortDescription: newProduct.shortDescription,
            detailedDescription: newProduct.detailedDescription,
            supplierContact: newProduct.supplierContact,
            price: newProduct.price,
            country: newProduct.country,
            media: newProduct.media,
            buyPrice: newProduct.buyPrice,
            quantity: newProduct.quantity,
            categoryId: +selectedCategory,
            totalPrice: newProduct.totalPrice,
            telegramOnly,
          },
          token,
        });
        if (response.status === 200) {
          onSuccess();
          onClose();
          setNotification({
            message: `Товар "${newProduct.name}" успешно изменен`,
            type: "success",
          });
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 400:
              setErrorMessage(error.response.data.message);
              break;
            case 401:
              navigate("/xxxopernDyn5fYk/admin/login");
              break;
            case 500:
              setErrorMessage("Ошибка сервера");
              break;
            default:
              setErrorMessage("Неизвестная ошибка");
              break;
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [
      newProduct.buyPrice,
      newProduct.country,
      newProduct.shortDescription,
      newProduct.detailedDescription,
      newProduct.supplierContact,
      newProduct.media,
      newProduct.name,
      newProduct.price,
      newProduct.quantity,
      newProduct.totalPrice,
      onClose,
      onSuccess,
      product.id,
      selectedCategory,
      setNotification,
      telegramOnly,
      token,
      navigate,
    ],
  );

  return (
    <Fragment>
      <Box
        component="form"
        onSubmit={handleSubmit}
        p={2}
      >
        <Grid
          container
          spacing={3}
          mb={3}
        >
          <Grid
            item
            xs={12}
          >
            <TextField
              required
              fullWidth
              id="name"
              label="Название"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              autoFocus
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              fullWidth
              id="shortDescription"
              label="Краткое описание"
              name="shortDescription"
              value={newProduct.shortDescription}
              onChange={handleChange}
              autoFocus
              rows={3}
              multiline
              error={!!shortDescriptionErrorMessage}
              helperText={shortDescriptionErrorMessage}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              fullWidth
              id="detailedDescription"
              label="Детальное описание"
              name="detailedDescription"
              value={newProduct.detailedDescription}
              onChange={handleChange}
              autoFocus
              rows={4}
              multiline
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              fullWidth
              id="supplierContact"
              label="Контакт Поставщика"
              name="supplierContact"
              value={newProduct.supplierContact}
              onChange={handleChange}
              autoFocus
              error={!!errorMessage}
              helperText={errorMessage}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <FormControl fullWidth>
              <InputLabel id="product-categories-select-label">
                Категории
              </InputLabel>
              <Select
                labelId="product-categories-select-label"
                id="product-categories-select"
                value={selectedCategory}
                label="Категории"
                onChange={handleSelectChange}
              >
                {categories.map(category => (
                  <MenuItem value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Autocomplete
              id="country-select"
              options={COUNTRIES_ARRAY}
              autoHighlight
              getOptionLabel={option => option.label}
              value={COUNTRIES_ARRAY.find(
                c => c.countryCode === newProduct.country,
              )}
              onChange={(event, newValue) => {
                setNewProduct(prev => ({
                  ...prev,
                  country: newValue ? newValue.countryCode : "",
                }));
              }}
              renderOption={(props, option) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <li {...props}>
                  <ReactCountryFlag
                    countryCode={option.countryCode}
                    svg
                    style={{
                      width: "2em",
                      height: "2em",
                      marginRight: "10px",
                    }}
                  />
                  {option.label}
                </li>
              )}
              renderInput={params => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label="Страна"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <FormControl fullWidth>
              <InputLabel id="media-select-label">Соц. сеть</InputLabel>
              <Select
                labelId="media-select-label"
                id="media-select"
                label="Соц. сеть"
                value={newProduct.media}
                onChange={handleSelectedMediaChange}
              >
                {SUPPORTED_MEDIA_OPTIONS.map(media => (
                  <MenuItem
                    value={media.value}
                    sx={{
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    {media.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Checkbox
              label="Только для Telegram"
              id="telegramOnly-checkbox"
              checked={telegramOnly}
              onChange={handleCheckboxChange}
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TextField
              fullWidth
              required
              id="price"
              label="Цена"
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              autoFocus
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TextField
              fullWidth
              id="buyPrice"
              required
              label="Цена закупки"
              type="number"
              name="buyPrice"
              value={newProduct.buyPrice}
              onChange={handleChange}
              autoFocus
              helperText={buyPriceErrorMessage}
            />
          </Grid>
        </Grid>
        <ButtonContainer>
          <Button
            isLoading={isLoading}
            type="submit"
            disabled={hasError}
          >
            Подтвердить
          </Button>
        </ButtonContainer>
      </Box>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {numberPriceErrorMessage && (
        <Alert severity="error">{numberPriceErrorMessage}</Alert>
      )}
    </Fragment>
  );
};

EditProductForm.displayName = "EditProductForm";

export default EditProductForm;
