import { memo } from "react";

import instagram from "assets/icons/instagram.svg";
import fb from "assets/icons/fb.svg";
import telegram from "assets/icons/telegram.svg";
import tikTok from "assets/icons/tikTok.svg";
import linkedIn from "assets/icons/linked-in.svg";
import google from "assets/icons/google.svg";
import bing from "assets/icons/bing.svg";
import reddit from "assets/icons/reddit.svg";
import proxy from "assets/icons/proxy.svg";

import bitcoin from "assets/icons/bitcoin.svg";
import usdt from "assets/icons/usdt.svg";
import cart_active from "assets/icons/cart_active.svg";
import cart from "assets/icons/cart.svg";
import check from "assets/icons/check.svg";
import cross from "assets/icons/cross.svg";
import chervon_left from "assets/icons/chervon_left.svg";
import minus from "assets/icons/minus.svg";
import filter_active from "assets/icons/filter_active.svg";
import filter from "assets/icons/filter.svg";
import menu from "assets/icons/menu.svg";
import card from "assets/icons/card.svg";
import plus from "assets/icons/plus.svg";
import home from "assets/icons/icon_home.svg";
import star from "assets/icons/star.png";
import arrowLeft from "assets/icons/arrowLeft.svg";
import contactUs from "assets/icons/contactUs.svg";
import type { IconSize, SupportedIcon } from "./__types";

const ICON_MAP: Record<SupportedIcon, string> = {
  instagram,
  fb,
  tikTok,
  linkedIn,
  google,
  bing,
  telegram,
  reddit,
  proxy,
  bitcoin,
  usdt,
  cart_active,
  cart,
  check,
  cross,
  chervon_left,
  minus,
  filter_active,
  filter,
  menu,
  card,
  plus,
  home,
  star,
  arrowLeft,
  contactUs,
};

const getIconSize = (s?: IconSize): number => {
  switch (s) {
    case "sm":
      return 16;
    case "md":
      return 24;
    case "lg":
      return 32;
    default:
      return 24;
  }
};

const Icon = ({
  icon,
  size,
  className,
}: {
  icon: SupportedIcon;
  size?: IconSize;
  className?: string;
}): JSX.Element => (
  <img
    src={ICON_MAP[icon]}
    alt="icon"
    width={getIconSize(size)}
    height={getIconSize(size)}
    className={className}
  />
);

Icon.displayName = "Icon";

Icon.defaultProps = {
  size: "md",
};

export default memo(Icon);
