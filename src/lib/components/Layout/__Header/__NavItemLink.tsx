// import Typography from "lib/ui/Typography";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import type { HeaderNavItem } from "./types";

const NavItemLink = ({ item }: { item: HeaderNavItem }): JSX.Element => {
  const resolved = useResolvedPath(item.link);
  const match = useMatch({ path: resolved.pathname, end: true });
  return (
    <NavLink
      to={item.link}
      style={{
        textDecoration: match ? "underline" : "none",
        color: match ? "#A0F900" : "inherit",
      }}
    >
      <p style={{ color: match ? "#A0F900" : "inherit" }}>{item.label}</p>
    </NavLink>
  );
};

NavItemLink.displayName = "NavItemLink";

export default NavItemLink;
