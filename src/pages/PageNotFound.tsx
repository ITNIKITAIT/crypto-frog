import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "lib/ui/Button";
import Icon from "lib/ui/Icon";
import Layout from "../lib/components/Layout";
import LanguageSwitch from "./__LanguageSwitch";
import Four from "../assets/icons/illustration404.png";
import style from "./__style.module.scss";

const PageNotFound = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Layout hideLayout>
      <div className={style["logo-language"]}>
        <LanguageSwitch />
      </div>
      <Helmet>
        <title>{t("pagenotfoundinfo")}</title>
      </Helmet>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          gap: "14px",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Four}
            alt="four"
            className={style["img-404"]}
          />
        </Container>
        <p className={style["title-404"]}>{t("pagenotfound")}</p>
        <p className={style["subtitle-404"]}>{t("pagenotfoundinfo2")}</p>
        <Link to="/">
          <Button
            type="submit"
            variant="primary"
          >
            <Icon icon="home" />
            {t("tohomepage")}
          </Button>
        </Link>
      </Box>
    </Layout>
  );
};

PageNotFound.displayName = "PageNotFound";

export default PageNotFound;
