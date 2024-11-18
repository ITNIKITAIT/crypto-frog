import type { ButtonVariant, SupportedIcon } from "lib/ui/__types";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
// import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

import {
  getDesktopBanner,
  getMobileBanner,
} from "lib/endpoints/api/user/advertisement/get";
import Button from "lib/ui/Button";
import Icon from "lib/ui/Icon";
import Typography from "lib/ui/Typography";
// import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { IBannerResponse } from "lib/advertisement/types";
import cosmo from "../../../assets/illustrations/frog-logo.png";

import CheckmarkCircle from "../../../assets/icons/checkmark-circle.svg";

import style from "./__style.module.scss";

const MainPageBanner = ({
  subtitle,
  actions,
  extra,
}: {
  subtitle: ReadonlyArray<{
    uuid: string;
    value: string;
  }>;
  extra: ReadonlyArray<{
    uuid: string;
    value: string;
    link: string;
    icon: SupportedIcon;
  }>;
  actions: ReadonlyArray<{
    uuid: string;
    label: string;
    link: string;
    variant: ButtonVariant;
    icon?: SupportedIcon;
  }>;
}): JSX.Element => {
  const handleScrollToProducts = useCallback((): void => {
    const productsSection = document.getElementById("section-products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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
        const desktopResponse = await getDesktopBanner();
        setDesktopBanner(desktopResponse.data);

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
    <section className={style["main-page-banner"]}>
      <div className={style["main-page-banner--content"]}>
        <Typography
          variant="title1"
          component="h1"
          className={style["main-page-banner--title"]}
        >
          {t("mainPageBanner.title")}
        </Typography>

        <p className={style["main-page-banner--description"]}>
          {t("mainPageBanner.description")}
        </p>
        <div className={style["main-page-banner--actions"]}>
          <Button
            variant={actions[0].variant}
            onClick={handleScrollToProducts}
          >
            {actions[0].icon && <Icon icon={actions[0].icon} />}
            {actions[0].label}
            {t("mainPageBanner.ourProducts")}
          </Button>
          <Link
            target="_blank"
            to="https://t.me/frog_crpt_private"
          >
            <Button
              className={style["main-page-private"]}
              variant={actions[0].variant}
            >
              {actions[0].icon && <Icon icon={actions[0].icon} />}
              {actions[0].label}
              {t("mainPageBanner.PrivateChannel")}
            </Button>
          </Link>
          {/* <Link
            to={actions[1].link}
            className={style["link-button"]}
            // variant={actions[1].variant}
            target="_blank"
            rel="noopener noreferrer"
          >
            {actions[1].icon && <Icon icon={actions[1].icon} />}
            {actions[1].label}
          </Link> */}
        </div>
        <ul className={style["main-page-banner--extra"]}>
          {extra.map(item => (
            <Link
              target="_blank"
              to={item.link}
            >
              <li key={item.uuid}>
                <Icon icon={item.icon} />

                {t(item.value)}
              </li>
            </Link>
          ))}
        </ul>
        <ul className={style["main-page-banner--subtitle"]}>
          {subtitle.map(item => (
            <li key={item.uuid}>
              <img
                src={CheckmarkCircle}
                alt="Checkmark"
                className={style["checkmark-separator"]}
              />
              <Typography
                variant="body2"
                component="span"
              >
                {t(item.value)}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className={style["violet-shining"]} /> */}
      <img
        src={cosmo}
        alt="cosmo"
        className={style.cosmo}
      />

      <Box>
        <img
          src={cosmo}
          alt="cosmo"
          className={style.mobileCosmo}
        />
      </Box>
      {desktopBanner && desktopBanner.linkUrl && (
        <div className={style.advertisement}>
          <a
            target="_blank"
            rel="noreferrer"
            href={desktopBanner.linkUrl}
          >
            <img
              src={`data:image/jpeg;base64,${desktopBanner.image}`}
              alt="ad"
            />
          </a>
        </div>
      )}
      {mobileBanner && mobileBanner.linkUrl && (
        <div className={style.advertisement_mobile}>
          <a
            target="_blank"
            rel="noreferrer"
            href={mobileBanner.linkUrl}
          >
            <img
              src={`data:image/jpeg;base64,${mobileBanner.image}`}
              alt="ad"
            />
          </a>
        </div>
      )}
    </section>
  );
};

MainPageBanner.displayName = "MainPageBanner";

export default MainPageBanner;
