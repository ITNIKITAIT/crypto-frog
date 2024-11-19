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
import { Link, useNavigate } from "react-router-dom";
import Typography from "lib/ui/Typography";
import { useTranslation } from "react-i18next";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import OrderPaid from "./__OrderPaid"; // Убедитесь, что путь к файлу корректный
import Warning from "../../assets/icons/Warning.svg";
import Usdt from "../../assets/icons/usdt.svg";
import Check from "../../assets/icons/check.svg";
import Copy from "../../assets/icons/copy.svg";
import style from "./__style.module.scss";
import DownloadOrderButton from "./__DownloadOrderButton";
import QrCode from "../../assets/illustrations/qr-code.jpeg";

const Content = ({ order }: { order: OrderProps }): JSX.Element => {
  const navigate = useNavigate();
  const [isOrderPaid, setIsOrderPaid] = useState<boolean>(order.payed);
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
      const endTime = moment(localTime).add(15, "minutes");
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
    let interval;
    if (!isOrderPaid) {
      interval = setInterval(() => {
        checkOrderStatus();
      }, 10000);
    }
    // checkOrderStatus();
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [order.orderId, isOrderPaid]);

  useEffect(() => {
    if (localTime) {
      const endTime = moment(localTime).add(15, "minutes");

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
          // navigate("/");
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
                  {t("bankmethod")}
                  <AccountBalanceIcon />
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
            {order.paymentMethod === "MONOBANK" && (
              <p className={style.purpose}>{t("purposepayment")}</p>
            )}

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
                  {order.paymentMethod !== "MONOBANK" ? (
                    <>
                      <b>{t("systemindent")}</b>
                      <ul className={style.req__list}>
                        <li>
                          {t("send")} <b>{amountToBePaid}</b>. <br />
                          {t("warninginfo")}
                        </li>
                        <li>{t("warninginfo2")}</li>
                        <li>{t("warninginfo3")}</li>
                      </ul>
                    </>
                  ) : (
                    <div>
                      {t("send")} <b>{amountToBePaid}</b>. <br />
                      {t("warninginfo")}
                    </div>
                  )}
                </>
              )}
            </div>
            <Link to="/">
              <button
                type="button"
                className={style.cancel_btn}
              >
                {t("cancel-order")}
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M4.85602 6.33333L6.96935 8.44667L5.79102 9.625L1.66602 5.5L5.79102 1.375L6.96935 2.55333L4.85602 4.66667H10.8327C12.6008 4.66667 14.2965 5.36905 15.5467 6.61929C16.797 7.86953 17.4993 9.56522 17.4993 11.3333C17.4993 13.1014 16.797 14.7971 15.5467 16.0474C14.2965 17.2976 12.6008 18 10.8327 18H3.33268V16.3333H10.8327C12.1588 16.3333 13.4305 15.8066 14.3682 14.8689C15.3059 13.9312 15.8327 12.6594 15.8327 11.3333C15.8327 10.0073 15.3059 8.73548 14.3682 7.7978C13.4305 6.86012 12.1588 6.33333 10.8327 6.33333H4.85602Z"
                      fill="#070A03"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_126_11886">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </Link>

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
