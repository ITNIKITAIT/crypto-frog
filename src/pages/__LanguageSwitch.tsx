import { useTranslation } from "react-i18next";
import Typography from "lib/ui/Typography";
import { ReactComponent as LanguageIcon } from "../assets/icons/language.svg";

import style from "./__style.module.scss";

const LanguageSwitch = (): JSX.Element => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguageToEnglish = () => {
    i18n.changeLanguage("en");
  };

  const changeLanguageToUkrainian = () => {
    i18n.changeLanguage("ua");
  };

  return (
    <div className={style["language-switch"]}>
      <button
        className={`${style.item} ${
          currentLanguage === "en" ? style["item-clicked"] : ""
        }`}
        type="button"
        onClick={changeLanguageToEnglish}
      >
        <Typography
          variant="body3"
          component="span"
        >
          EN
        </Typography>
      </button>
      <LanguageIcon />
      <button
        className={`${style.item} ${
          currentLanguage === "ua" ? style["item-clicked"] : ""
        }`}
        type="button"
        onClick={changeLanguageToUkrainian}
      >
        <Typography
          variant="body3"
          component="span"
        >
          UA
        </Typography>
      </button>
    </div>
  );
};

export default LanguageSwitch;
