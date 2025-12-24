import { NavLink } from "react-router-dom";

function MobileNavItem({ to, children, setOpen }) {
  return (
    <NavLink
      to={to}
      onClick={() => setOpen(false)}
      className="block py-3 hover:text-foreground transition-colors"
    >
      {children}
    </NavLink>
  );
}

export default MobileNavItem;
