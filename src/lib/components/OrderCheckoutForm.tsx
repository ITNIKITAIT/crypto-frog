import { Alert, Box, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useCartItemsDispatch } from "lib/cart/items-context";
import type { CartItemProps } from "lib/cart/types";
import { postApiUserOrder } from "lib/endpoints/api/user/order/post";
import InputEmail from "lib/inputs/InputEmail";
import usdToNumber from "lib/price/usdToNumber";
import Typography from "lib/ui/Typography";
// import Button from "lib/ui/Button";
import PaymentButton from "lib/ui/PaymentButton";
// import PaymentRadioButton from "lib/ui/PaymentRadioBox";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OrderCheckoutForm = ({
  items,
  totalPrice,
}: {
  items: ReadonlyArray<CartItemProps>;
  totalPrice: string;
}): JSX.Element => {
  const cartItemsDispatch = useCartItemsDispatch();

  const [email, setEmail] = useState<string>("");
  const [coupon, setCoupon] = useState<string>("");

  const [emailInputError, setEmailInputError] = useState<boolean>(false);

  const [isByCardLoading, setIsByCardLoading] = useState<boolean>(false);
  const [isByCryptoLoading, setIsByCryptoLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const handleEmailError = useCallback((newValue: boolean) => {
    setEmailInputError(newValue);
  }, []);

  const handleCouponChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCoupon(event.target.value);
      if (event.target.value === "") {
        setErrorMessage("");
      } else if (
        /^[a-zA-Z0-9]*$/.test(event.target.value) &&
        event.target.value.length >= 3 &&
        event.target.value.length <= 30
      ) {
        setErrorMessage("");
      } else {
        setErrorMessage(t("invalidinput"));
      }
    },
    [t, setCoupon, setErrorMessage],
  );

  const itemsMap = useMemo(
    () =>
      items.reduce((acc, item) => {
        const key = Number(item.id);
        if (!Number.isNaN(key)) {
          acc[key] = item.quantityInCart;
        }
        return acc;
      }, {} as { [key: number]: number }),
    [items],
  );

  const handlePayByCardClick = useCallback(async () => {
    try {
      setIsByCardLoading(true);
      if (!email) {
        setErrorMessage(t("enteremail"));
        return;
      }
      const response = await postApiUserOrder({
        order: {
          items: itemsMap,
          totalPrice: usdToNumber(totalPrice),
          paymentMethod: "MONOBANK",
          userEmail: email,
          discountCode: coupon,
        },
      });
      if (response.status === 200) {
        setErrorMessage(t("userblocked"));
      } else {
        cartItemsDispatch({
          type: "CLEAR",
        });
        setTimeout(() => {
          navigate(`/order?orderId=${response.data.orderId}`);
        }, 0);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 500: // ошибка сервера
            setErrorMessage(t("servererror"));
            break;
          case 403: // 403 - пользователь забанен
            setErrorMessage(t("userblocked"));
            break;
          case 404: // 404 - купон не найден
            setErrorMessage(t("couponnotfound"));
            break;
          default:
            setErrorMessage(t("paymenterror"));
            break;
        }
      }
    } finally {
      setIsByCardLoading(false);
    }
  }, [cartItemsDispatch, coupon, email, itemsMap, navigate, totalPrice, t]);

  const handlePayByCryptoClick = useCallback(async () => {
    try {
      setIsByCryptoLoading(true);
      if (!email) {
        setErrorMessage(t("enteremail"));
        return;
      }
      const response = await postApiUserOrder({
        order: {
          items: itemsMap,
          totalPrice: usdToNumber(totalPrice),
          paymentMethod: "CRYPTO",
          userEmail: email,
          discountCode: coupon,
        },
      });
      if (response.status === 200) {
        setErrorMessage(t("userblocked"));
      } else {
        cartItemsDispatch({
          type: "CLEAR",
        });
        setTimeout(() => {
          navigate(`/order?orderId=${response.data.orderId}`);
        }, 0);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 500:
            setErrorMessage(t("servererror"));
            break;
          case 403: // 403 - пользователь забанен
            setErrorMessage(t("userblocked"));
            break;
          case 404: // 404 - купон не найден
            setErrorMessage(t("couponnotfound"));
            break;
          default:
            setErrorMessage(t("paymenterror"));
            break;
        }
      }
    } finally {
      setIsByCryptoLoading(false);
    }
  }, [cartItemsDispatch, coupon, email, itemsMap, navigate, totalPrice, t]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        mt: 3,
      }}
    >
      <InputEmail
        value={email}
        error={emailInputError}
        onChange={handleEmailChange}
        onError={handleEmailError}
      />
      <TextField
        id="coupon"
        label={t("coupon")}
        variant="standard"
        fullWidth
        value={coupon}
        onChange={handleCouponChange}
        inputProps={{
          pattern: "^[a-zA-Z0-9]{3,30}$",
        }}
        error={!!errorMessage && coupon.trim() !== ""}
        helperText={errorMessage}
      />
      <Typography
        component="span"
        variant="body1"
      >
        {t("paymentmethod")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <PaymentButton
          variant="card"
          isLoading={isByCardLoading}
          onClick={handlePayByCardClick}
          disabled={emailInputError}
        />
        <PaymentButton
          variant="usdt"
          isLoading={isByCryptoLoading}
          onClick={handlePayByCryptoClick}
          disabled={emailInputError}
        />
      </Box>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </Box>
  );
};

OrderCheckoutForm.displayName = "OrderCheckoutForm";

export default OrderCheckoutForm;
