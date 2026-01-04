import { NavLink } from "react-router-dom";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `hover:text-foreground transition-colors ${
          isActive ? "text-foreground font-semibold" : "text-muted-foreground"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default NavItem;
