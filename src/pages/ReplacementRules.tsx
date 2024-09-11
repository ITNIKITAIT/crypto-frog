import { Helmet } from "react-helmet";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Layout from "../lib/components/Layout";
import Typography from "../lib/ui/Typography";

const ReplacementRules = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Helmet>
        <title>{t("replacementhelmet")}</title>
      </Helmet>
      <Typography
        component="h1"
        variant="title1"
      >
        {t("replacementrules")}
      </Typography>
      <Typography
        variant="body2bold"
        component="p"
      >
        {t("rules1")}
        <br />
        {t("rules2")}
        <br />
        {t("rules3")}
        <br />
        {t("rules4")}
        <br />
        {t("rules5")}
        <br />
        {t("rules6")}
        <br />
        {t("rules7")}
        <br />
        {t("rules8")}
        <br />
        {t("rules9")}
        <br />
        {t("rules10")}
        <br />
        {t("rules11")}
        <br />
        {t("rules12")}
        <br />
        {t("rules13")}
        <br />
        {t("rules14")}
        <br />
        {t("rules15")}
        <br />
        {t("rules16")}
        <br />
      </Typography>
      <Box mt={2}>
        <Typography
          variant="body3bold"
          component="p"
        >
          {t("content")}
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography
          variant="body3bold"
          component="p"
        >
          {t("outro")}
        </Typography>
      </Box>
    </Layout>
  );
};

ReplacementRules.displayName = "ReplacementRules";

export default ReplacementRules;
