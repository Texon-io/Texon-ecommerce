import { X, Menu, User, Heart, ShoppingBag } from "lucide-react";
import IconButtonWithBadge from "./IconButtonWithBadge";
import { useWishlistCount } from "@/pages/Wishlist/useWishlist";
import { useCart } from "@/pages/Cart/useCart";

function ActionsIcons({ open, setOpen }) {
  const { data: wishlistCount } = useWishlistCount();
  const { totalItems } = useCart();

  return (
    <div className="flex items-center gap-3">
      {/* User */}
      <IconButtonWithBadge to={`/userdashboard`} ariaLabel="User Profile">
        <User size={22} />
      </IconButtonWithBadge>

      {/* Wishlist */}
      <IconButtonWithBadge
        to={`/wishlist`}
        badgeCount={wishlistCount}
        ariaLabel="Wishlist"
      >
        <Heart size={22} />
      </IconButtonWithBadge>

      {/* Cart */}
      <IconButtonWithBadge
        to={`/cart`}
        badgeCount={totalItems}
        ariaLabel="Shopping Cart"
      >
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
