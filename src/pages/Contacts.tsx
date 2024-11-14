import { Box } from "@mui/material";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Icon from "lib/ui/Icon";
import Layout from "../lib/components/Layout";
import Typography from "../lib/ui/Typography";
import style from "./__style.module.scss";

const Contacts = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Helmet>
        <title>{t("contactshelmet")}</title>
      </Helmet>
      <Link
        to="/"
        className={style.back__link}
      >
        <Icon icon="chervon_left" />
        {t("tothemain")}
      </Link>
      <Typography
        component="h1"
        variant="title1"
      >
        {t("contacts")}
      </Typography>
      <Box mt={2}>
        <Typography
          variant="body2bold"
          component="p"
        >
          {t("contactinfo")}{" "}
          <a
            href="https://t.me/ulyafrogivna"
            style={{ textDecoration: "underline" }}
          >
            https://t.me/ulyafrogivna
          </a>
        </Typography>
      </Box>
    </Layout>
  );
};

Contacts.displayName = "Contacts";

export default Contacts;
