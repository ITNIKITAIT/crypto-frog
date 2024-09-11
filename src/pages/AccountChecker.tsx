import { Helmet } from "react-helmet";
import Layout from "../lib/components/Layout";
import Typography from "../lib/ui/Typography";

// NOTE: Пока не используется
const AccountChecker = (): JSX.Element => (
  <Layout>
    <Helmet>
      <title>Чекер аккаунтов | Rocket - Лучшие расходники</title>
    </Helmet>
    <Typography
      component="h1"
      variant="title1"
    >
      Чекер аккаунтов
    </Typography>
  </Layout>
);

AccountChecker.displayName = "AccountChecker";

export default AccountChecker;
