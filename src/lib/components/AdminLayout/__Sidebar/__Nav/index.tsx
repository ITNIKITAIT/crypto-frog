import { List } from "@mui/material";
import { SIDEBAR_ITEMS } from "cms/admin/sidebar";
import NavItem from "./__NavItem";

const Nav = (): JSX.Element => (
  <List
    sx={{
      display: {
        xs: "flex",
        lg: "block",
      },
      overflowX: {
        xs: "auto",
        lg: "hidden",
      },
      mb: {
        xs: 1,
        lg: 0,
      },
    }}
  >
    {SIDEBAR_ITEMS.map(item => (
      <NavItem
        key={item.to}
        item={item}
      />
    ))}
  </List>
);

Nav.displayName = "Admin_Nav";

export default Nav;
