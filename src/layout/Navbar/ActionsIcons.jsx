import { X, Menu, User, Heart, ShoppingBag } from "lucide-react";
import IconButtonWithBadge from "./IconButtonWithBadge";

function ActionsIcons({ open, setOpen }) {
  return (
    <div className="flex items-center gap-3">
      {/* User */}
      <IconButtonWithBadge ariaLabel="User Profile">
        <User size={22} />
      </IconButtonWithBadge>

      {/* Wishlist */}
      <IconButtonWithBadge badgeCount={2} ariaLabel="Wishlist">
        <Heart size={22} />
      </IconButtonWithBadge>

      {/* Cart */}
      <IconButtonWithBadge badgeCount={3} ariaLabel="Shopping Cart">
        <ShoppingBag size={22} />
      </IconButtonWithBadge>

      {/* Mobile Menu Button */}
      <IconButtonWithBadge
        onClick={() => setOpen(!open)}
        ariaLabel="Toggle Menu"
        className="md:hidden"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </IconButtonWithBadge>
    </div>
  );
}

export default ActionsIcons;
