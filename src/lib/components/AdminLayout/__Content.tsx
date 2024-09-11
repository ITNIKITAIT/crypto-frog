import { useAuth } from "lib/auth/admin/AuthContext";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import Typography from "lib/ui/Typography";
import Sidebar from "./__Sidebar";

import style from "./__style.module.scss";

const Content = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element => {
  const { token } = useAuth();
  const navigate = useNavigate();
  if (!token) {
    navigate("/xxxopernDyn5fYk/admin/login");
  }

  return (
    <main className={style.layout}>
      <Grid
        container
        sx={{
          backgroundColor: "background.default",
        }}
      >
        <Grid
          item
          xs={12}
          lg={2.5}
          sx={{
            backgroundColor: "background.paper",
            minHeight: {
              lg: "100vh",
            },
          }}
        >
          <Sidebar />
        </Grid>
        <Grid
          item
          xs={12}
          lg={9.5}
          sx={{
            p: {
              xs: 2,
              lg: 6,
            },
            position: "relative",
          }}
          marginX="auto"
        >
          <Typography component="h1">{title}</Typography>
          {children}
        </Grid>
      </Grid>
    </main>
  );
};

Content.displayName = "Content";

export default Content;
