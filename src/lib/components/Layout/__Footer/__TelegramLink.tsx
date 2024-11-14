import telegram from "assets/icons/telegram.svg";
import styles from "./__style.module.scss";

interface Props {
  name: string;
  url: string;
}

const TelegramLink = ({ name, url }: Props): JSX.Element => (
  <a
    href={url}
    className={styles.footer__telegram}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={telegram}
      alt="Telegram"
    />
    <span>{name}</span>
  </a>
);

TelegramLink.displayName = TelegramLink;

export default TelegramLink;
