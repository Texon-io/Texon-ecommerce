import Button from "../../components/ui/Button";
import { Heart } from "lucide-react";
import { Truck } from "lucide-react";
import { Sprout } from "lucide-react";
import { useState } from "react";
import ProductPrice from "../../components/ui/ProductPrice";
import { useIsInWishlist, useWishlistActions } from "../Wishlist/useWishlist";
import { toast } from "sonner";
import { useCart, useCartActions, useIsInCart } from "../Cart/useCart";

export function ProductInfo({ product }) {
  // Wishlist
  const { addToWishlist, removeFromWishlist } = useWishlistActions();
  const { data: isWishlisted } = useIsInWishlist(product.id);
  // Cart
  const { cartItems } = useCart();
  const { addToCart, removeFromCart } = useCartActions();
  const { data: cartStatus = { isInCart: false } } = useIsInCart(product.id);

  // State
  const [isWishlistClicked, setIsWishlistClicked] = useState(isWishlisted);
  const [isCartClicked, setIsCartClicked] = useState(cartStatus.isInCart);

  const cartItemId = cartItems.find(
    (item) => item.id === product.id
  )?.cartItemId;

  const handleAddToCart = () => {
    if (isCartClicked) {
      removeFromCart(cartItemId);
      setIsCartClicked(!isCartClicked);
      toast.success("Removed from cart!");
    } else {
      addToCart({ productId: product.id });
      setIsCartClicked(!isCartClicked);
      toast.success("Added to cart!");
    }
  };

  const handleToggleWishlist = () => {
    if (isWishlistClicked) {
      removeFromWishlist(product.id);
      setIsWishlistClicked(!isWishlistClicked);
      toast.success("Removed from wishlist!");
    } else {
      addToWishlist(product.id);
      setIsWishlistClicked(!isWishlistClicked);
      toast.success("Added to wishlist!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        {/* Description */}
        <p className="text-sm text-brand-gray leading-relaxed ">
          {product.description}
        </p>
        {/* Price */}
        <ProductPrice
          price={product.price}
          hasDiscount={product.hasDiscount}
          discountPercentage={product.discountPercentage}
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground ">
          <Truck size={22} className="inline-block text-brand-secondary" />
          <p className="italic font-medium">Free shipping included</p>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground ">
          <Sprout size={22} className="inline-block text-brand-secondary" />
          <p className="italic font-medium">
            Made from the best of materials sourced
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          onClick={handleAddToCart}
          variant={isCartClicked ? "outline" : "main"}
          size="lg"
          className="flex-1 rounded-lg"
        >
          {isCartClicked ? "Remove from Cart" : "Add to Cart"}
        </Button>

        <button
          onClick={handleToggleWishlist}
          className="rounded-lg border p-3 cursor-pointer hover:bg-gray-100 active:scale-95 transition"
        >
          <Heart
            size={20}
            color={isWishlistClicked ? "red" : "black"}
            fill={isWishlistClicked ? "red" : "none"}
            strokeWidth={2.3}
          />
        </button>
      </div>
    </div>
  );
}
