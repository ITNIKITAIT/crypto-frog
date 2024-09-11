import telegram from "assets/icons/telegram.svg";
import styles from "./__style.module.scss";

const TelegramLink = (): JSX.Element => (
  <a
    href="https://t.me/rocketsup"
    className={styles.footer__telegram}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={telegram}
      alt="Telegram"
    />
    <span>@rocketsup</span>
  </a>
);

TelegramLink.displayName = TelegramLink;

export default TelegramLink;
