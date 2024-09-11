import { Box } from "@mui/material";
import Logo from "lib/ui/Logo";

import Nav from "./__Nav";
import Logout from "./__Logout";

const Sidebar = (): JSX.Element => (
  <Box>
    <Box
      p={3}
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <Logo />
      <Logout />
    </Box>
    <Nav />
  </Box>
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
