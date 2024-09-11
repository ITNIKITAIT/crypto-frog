import { ThemeProvider } from "@mui/material";
import { theme } from "lib/ui/theme";

import Content from "./__Content";

const AdminLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element => (
  <ThemeProvider theme={theme}>
    <Content title={title}>{children}</Content>
  </ThemeProvider>
);

AdminLayout.displayName = "AdminLayout";

export default AdminLayout;
