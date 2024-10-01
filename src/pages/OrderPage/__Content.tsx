import { useState, useEffect, useCallback } from "react";
import {
  Container,
  CircularProgress,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { MONOBANK_CARD, CRYPTO_WALLET } from "cms/PaymentInfo";
import { getApiUserOrderPaid } from "lib/endpoints/api/user/order/paid/get";
import { OrderProps } from "lib/orders/types";
import numberToUah from "lib/price/numberToUah";
import numberToUsd from "lib/price/numberToUsd";
import { round } from "lib/utils/round";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import Typography from "lib/ui/Typography";
import { useTranslation } from "react-i18next";
import OrderPaid from "./__OrderPaid"; // Убедитесь, что путь к файлу корректный
import Warning from "../../assets/icons/Warning.svg";
import Usdt from "../../assets/icons/usdt.svg";
import Card from "../../assets/icons/card.svg";
import Check from "../../assets/icons/check.svg";
import Visa from "../../assets/icons/card_logo_visa.svg";
import Copy from "../../assets/icons/copy.svg";
import style from "./__style.module.scss";
import DownloadOrderButton from "./__DownloadOrderButton";
import QrCode from "../../assets/illustrations/qr-code.jpeg";

const Content = ({ order }: { order: OrderProps }): JSX.Element => {
  const navigate = useNavigate();
  const [isOrderPaid, setIsOrderPaid] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>();
  const [showDownload, setShowDownload] = useState<boolean>(false);
  const serverTime = order?.date;
  const localTime = moment.tz(serverTime, "Europe/Warsaw").local();
  const [progress, setProgress] = useState(100);
  const [isCopied, setIsCopied] = useState(false);

  const { t } = useTranslation();

  const amountToBePaid = order
    ? order.paymentMethod === "CRYPTO"
      ? numberToUsd(round(order.totalPrice, 2))
      : numberToUah(round(order.totalPrice, 2))
    : "0";

  const paymentInstructions =
    order?.paymentMethod === "MONOBANK" ? MONOBANK_CARD : CRYPTO_WALLET;

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(paymentInstructions)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error("Copy failed: ", error);
      });
  }, [paymentInstructions]);

  useEffect(() => {
    let interval;

    if (localTime) {
      const endTime = moment(localTime).add(10, "minutes");
      const totalDuration = endTime.diff(localTime);

      interval = setInterval(() => {
        const currentTime = moment();
        const timeRemaining = endTime.diff(currentTime);
        const newProgress = (timeRemaining / totalDuration) * 100;
        setProgress(newProgress);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [localTime]);

  useEffect(() => {
    const checkOrderStatus = async () => {
      try {
        const response = await getApiUserOrderPaid({ id: order.orderId });
        if (response.data === true) {
          setIsOrderPaid(true);
          setShowDownload(true);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Ошибка при проверке оплаты: ", error);
      }
    };
    const interval = setInterval(() => {
      checkOrderStatus();
    }, 10000);
    // checkOrderStatus();
    return () => clearInterval(interval);
  }, [order.orderId]);

  useEffect(() => {
    if (localTime) {
      const endTime = moment(localTime).add(10, "minutes");

      const interval = setInterval(() => {
        const currentTime = moment();
        const timeRemaining = endTime.diff(currentTime);

        if (order?.manual) {
          clearInterval(interval);
          setShowDownload(true);
          return;
        }
        if (timeRemaining <= 0 && isOrderPaid === false) {
          clearInterval(interval);
          navigate("/");
        } else {
          setTimeLeft(timeRemaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
    return () => {};
  }, [navigate, localTime, isOrderPaid, order]);

  // Форматирование времени для отображения
  const formatTimeLeft = time => {
    if (!time) return "00:00";
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {isOrderPaid || order?.manual ? (
        <OrderPaid
          orderId={order}
          isOrderPaid={isOrderPaid}
        />
      ) : (
        <>
          <Container
            sx={{
              display: "flex",
              alignItems: { xs: "center", sm: "flex-start" },
              flexDirection: "column",
              marginLeft: 0,
              gap: "32px",
            }}
            maxWidth="md"
          >
            <Typography
              component="h1"
              variant="title2"
            >
              {t("payment")} #{order?.orderId}
            </Typography>

            <div>
              {order.paymentMethod === "MONOBANK" && (
                <div className={style.info}>
                  Card
                  <img
                    src={Card}
                    alt="card"
                    className={style["info-usdt"]}
                  />
                </div>
              )}

              {order.paymentMethod === "CRYPTO" && (
                <div className={style.info}>
                  USDT TRC 20
                  <img
                    src={Usdt}
                    alt="usdt"
                    className={style["info-usdt"]}
                  />
                </div>
              )}
            </div>

            <TextField
              id="amountToBePaid"
              label={t("amounttobepaid")}
              variant="standard"
              value={amountToBePaid}
              sx={{
                width: { xs: "100%", sm: "50%" },
              }}
            />

            <TextField
              id="paymentInstructions"
              label={t("paymentdetails")}
              variant="standard"
              value={paymentInstructions}
              sx={{
                width: { xs: "100%", sm: "50%" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {order.paymentMethod === "MONOBANK" && (
                      <img
                        src={Visa}
                        alt="Visa"
                        style={{ marginRight: 8 }}
                      />
                    )}
                    <IconButton onClick={handleCopyToClipboard}>
                      <img
                        src={Copy}
                        alt="Copy"
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className={style.warn}>
              {isOrderPaid || order?.manual ? (
                <OrderPaid
                  orderId={order}
                  isOrderPaid={isOrderPaid}
                />
              ) : (
                <>
                  <div className={style["warning-inline"]}>
                    <img
                      src={Warning}
                      alt="Warning"
                      className={style["warning-icon"]}
                    />
                    <span className={style["warning-head"]}>
                      {t("warning")}
                    </span>
                  </div>
                  <p>
                    {t("send")} <b>{amountToBePaid}</b>. <br />
                    {t("warninginfo")}
                  </p>
                </>
              )}
            </div>

            <Box className={style["progress-container"]}>
              <Box
                className={style["progress-bar"]}
                sx={{ right: `${100 - progress}%` }}
              />
              {!showDownload && timeLeft !== undefined && (
                <Typography className={style["progress-text"]}>
                  {formatTimeLeft(timeLeft)}
                </Typography>
              )}
              {showDownload && <DownloadOrderButton orderId={order.orderId} />}
              {!showDownload && timeLeft === 0 && (
                <CircularProgress size={16} />
              )}
            </Box>
          </Container>
          {order.paymentMethod === "CRYPTO" && (
            <div className={style["qr-div"]}>
              <div className={style["qr-code"]}>
                <img
                  src={QrCode}
                  alt="QR Code"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <p className={style["qr-code-text"]}>{t("scan")}</p>
            </div>
          )}
          {isCopied && (
            <div className={style.copiedMessage}>
              <img
                src={Check}
                alt="check"
                className={style["check-img"]}
              />
              {t("copied")}
            </div>
          )}
        </>
      )}
    </Box>
  );
};

Content.displayName = "Content";

export default Content;
