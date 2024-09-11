import { Box } from "@mui/material";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Layout from "../lib/components/Layout";
import Typography from "../lib/ui/Typography";

const Contacts = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Helmet>
        <title>{t("contactshelmet")}</title>
      </Helmet>
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
            href="https://t.me/rocketsup"
            style={{ textDecoration: "underline" }}
          >
            t.me/rocketsup
          </a>
        </Typography>
      </Box>
    </Layout>
  );
};

Contacts.displayName = "Contacts";

export default Contacts;
