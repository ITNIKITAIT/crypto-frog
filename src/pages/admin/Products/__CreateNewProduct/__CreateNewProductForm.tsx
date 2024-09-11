import type { CategoryProps } from "lib/category/types";

import { useState, useCallback, type ChangeEvent, Fragment } from "react";
import { AxiosError } from "axios";
import { useAuth } from "lib/auth/admin/AuthContext";
import { postApiAdminItem } from "lib/endpoints/api/admin/item/post";
import { useNotification } from "lib/notification";

import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  SelectChangeEvent,
  Autocomplete,
} from "@mui/material";
import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import { COUNTRIES_ARRAY } from "lib/country/types";
import ReactCountryFlag from "react-country-flag";
import Checkbox from "lib/ui/Checkbox";
import { useNavigate } from "react-router-dom";
import { SUPPORTED_MEDIA_OPTIONS, SupportedMedia } from "lib/media/types";
// import InputNumberBasic from "lib/inputs/InputNumberBasic";

const CreateNewCategoryForm = ({
  categories,
  onClose,
  onSuccess,
}: {
  categories: ReadonlyArray<CategoryProps>;
  onClose: () => void;
  onSuccess: () => void;
}): JSX.Element => {
  const { token } = useAuth();
  const [newProduct, setNewProduct] = useState<{
    name: string;
    shortDescription: string;
    detailedDescription: string;
    supplierContact: string;
    price: number;
    country: string;
    media: SupportedMedia;
    buyPrice: number;
    quantity: number;
    totalPrice: number;
  }>({
    name: "",
    shortDescription: "",
    detailedDescription: "",
    supplierContact: "",
    price: 0.01,
    country: "",
    media: "fb",
    buyPrice: 0,
    quantity: 0,
    totalPrice: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id.toString(),
  );
  const [telegramOnly, setTelegramOnly] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setNotification } = useNotification();
  const [shortDescriptionErrorMessage, setShortDescriptionErrorMessage] =
    useState<string>("");
  const [buyPriceErrorMessage, setBuyPriceErrorMessage] = useState<string>("");
  const [numberPriceErrorMessage, setNumberPriceErrorMessage] =
    useState<string>("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

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
        parseFloat(value.replace(",", ".")) >=
          parseFloat(newProduct.price.toString().replace(",", "."))
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
    [newProduct.price, newProduct.buyPrice],
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

  const handleSelectedMediaChange = useCallback(
    (e: SelectChangeEvent) => {
      setNewProduct({
        ...newProduct,
        media: e.target.value as SupportedMedia,
      });
    },
    [newProduct],
  );

  const handleSelectChange = useCallback((e: SelectChangeEvent) => {
    setSelectedCategory(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const response = await postApiAdminItem({
          item: {
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
        if (response.status === 201) {
          onSuccess();
          onClose();
          setNotification({
            message: `Товар "${newProduct.name}" успешно добавлен`,
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
              value={onmessage}
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
              onChange={handleChange}
              value={onmessage}
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
              onChange={handleChange}
              value={onmessage}
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
                    autoComplete: "new-password", // disable autocomplete and autofill
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
              // helperText={numberPriceErrorMessage}
              // error={!!numberPriceErrorMessage}
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TextField
              fullWidth
              required
              id="buyPrice"
              label="Цена закупки"
              type="number"
              name="buyPrice"
              value={newProduct.buyPrice}
              onChange={handleChange}
              autoFocus
              helperText={buyPriceErrorMessage}
              // error={!!numberPriceErrorMessage}
            />
          </Grid>
        </Grid>
        <ButtonContainer>
          <Button
            isLoading={isLoading}
            type="submit"
            disabled={hasError}
          >
            Добавить
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

CreateNewCategoryForm.displayName = "CreateNewCategoryForm";

export default CreateNewCategoryForm;
