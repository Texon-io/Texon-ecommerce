import { useState } from "react";
import MobileNavItem from "./MobileNavItem";
import NavItem from "./NavItem";
import ActionsIcons from "./ActionsIcons";
import { NavLink } from "react-router";

const NavItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/categories", label: "Categories" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-border bg-brand-white fixed z-50 ">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-7 md:px-14">
        {/* Logo */}
        <NavLink
          to="/"
          className="cursor-pointer text-xl font-bold tracking-wide"
        >
          VipeCart
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-base font-medium text-muted-foreground">
          {NavItems.map((item) => (
            <NavItem key={item.to} to={item.to}>
              {item.label}
            </NavItem>
          ))}
        </nav>

        {/* Actions */}
        <ActionsIcons open={open} setOpen={setOpen} />
      </div>

      <div
        className={`md:hidden absolute inset-x-0 top-16 bg-brand-white border-b border-border overflow-hidden transition-all duration-300 ease-out ${
          open
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-8 text-sm font-medium">
          {NavItems.map((item) => (
            <MobileNavItem key={item.to} to={item.to} setOpen={setOpen}>
              {item.label}
            </MobileNavItem>
          ))}
        </nav>
      </div>
    </header>
  );
}
