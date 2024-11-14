import {
  People,
  Category,
  Inventory,
  Store,
  Discount,
  AccountBalance,
  Telegram,
} from "@mui/icons-material";
import DiscountIcon from "@mui/icons-material/Discount";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";

import Icon from "lib/ui/Icon";
import style from "./__style.module.scss";

const NavItem = ({
  item,
}: {
  item: {
    title: string;
    to: string;
    icon: string;
  };
}): JSX.Element => {
  const icon = useMemo((): null | JSX.Element => {
    switch (item.icon) {
      case "people":
        return <People color="primary" />;
      case "category":
        return <Category color="primary" />;
      case "inventory":
        return <Inventory color="primary" />;
      case "store":
        return <Store color="primary" />;
      case "discount":
        return <Discount color="primary" />;
      case "account-balance":
        return <AccountBalance color="primary" />;
      case "telegram":
        return <Telegram color="primary" />;
      case "promocodes":
        return <DiscountIcon color="primary" />;
      case "ad":
        return <Icon icon="arrowRight" />;
      default:
        return null;
    }
  }, [item.icon]);

  return (
    <NavLink
      to={item.to}
      // eslint-disable-next-line react/jsx-no-bind
      className={({ isActive, isPending }) =>
        isPending ? style.link_pending : isActive ? style.link_active : ""
      }
    >
      <ListItem
        key={item.to}
        disablePadding
      >
        <ListItemButton sx={{ pl: 3 }}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}

          <ListItemText
            primary={item.title}
            sx={{
              color: "text.primary",
              fontWeight: "medium",
              fontSize: "0.875rem",
            }}
          />
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
};

NavItem.displayName = "Admin_Nav_NavItem";

export default NavItem;
