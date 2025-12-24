import { NavLink } from "react-router-dom";

function NavItem({ to, children }) {
  return (
    <NavLink to={to} className="hover:text-foreground transition-colors">
      {children}
    </NavLink>
  );
}

export default NavItem;
