import { NavLink } from "react-router";

function IconButtonWithBadge({
  children,
  badgeCount,
  onClick,
  ariaLabel,
  className,
  to,
}) {
  return (
    <NavLink
      to={to || "#"}
      className={({ isActive }) =>
        `relative cursor-pointer rounded-full p-2 hover:bg-brand-main-trans transition ${
          isActive ? "bg-brand-main-trans" : ""
        } ${className}`
      }
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
      {badgeCount > 0 && (
        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-[10px] text-brand-white flex items-center justify-center">
          {badgeCount}
        </span>
      )}
    </NavLink>
  );
}

export default IconButtonWithBadge;
