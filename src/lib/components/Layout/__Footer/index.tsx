// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import Container from "lib/ui/Container";
// import Logo from "lib/ui/Logo";
import Typography from "lib/ui/Typography";
import TelegramLink from "./__TelegramLink";

import style from "./__style.module.scss";

const COPYRIGHT = `Ⓒ ${new Date().getFullYear()} Rocket`;

const Footer = ({ className }: { className: string }): JSX.Element => (
  // const { t } = useTranslation();

  <Container
    component="footer"
    className={className}
  >
    <div className={style.footer}>
      <div />
      <div className={style["copyright-wrapper"]}>
        <Typography
          variant="copyright"
          component="span"
        >
          {COPYRIGHT}
        </Typography>
        {/* <Link to="/xxxopernDyn5fYk/admin/login">
            <Typography
              variant="body4"
              component="span"
            >
              {t("admin")}
            </Typography>
          </Link> */}
      </div>
      <TelegramLink />
    </div>
  </Container>
);

Footer.displayName = "Footer";

export default Footer;
