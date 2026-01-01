import Button from "@/components/ui/Button";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { useCartActions } from "./useCart.js";
import ProductPrice from "@/components/ui/ProductPrice";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDeleteDialog from "@/components/ui/ConfirmDeleteDialog";
import {
  useIsInWishlist,
  useWishlistActions,
} from "../Wishlist/useWishlist.js";
import { handleAddToWishlist } from "@/utils/helpers.js";

export function CartItem({ item }) {
  const [open, setOpen] = useState(false);
  const { addToWishlist } = useWishlistActions();
  const { updateQuantity, removeFromCart } = useCartActions();
  const {
    price,
    discount,
    quantity,
    image_url,
    title,
    description,
    cartItemId,
    stock,
  } = item;
  const { data: isWishlisted } = useIsInWishlist(item.id);

  return (
    <div className="flex flex-col sm:flex-row gap-6 rounded-xl border border-border p-4">
      {/* Image */}
      <img
        src={image_url}
        alt={title}
        className="h-52 sm:h-38 w-full sm:w-38 rounded-lg object-cover border border-brand-main"
      />

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between p-2">
        {/* Title + Price */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-medium">{title}</h3>

            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            <span
              className={`mt-2 flex w-fit items-center justify-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold ${
                stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {stock > 0 ? `'${stock}' In Stock` : "Out of Stock"}
            </span>
          </div>

          {/* Price */}
          <div className="self-end sm:self-auto">
            <ProductPrice
              className="text-lg sm:text-xl font-bold text-brand-main2"
              price={price}
              hasDiscount={discount > 0}
              discountPercentage={discount}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-row flex-wrap items-center justify-between gap-4 ">
          {/* Left actions */}
          <div className="flex flex-wrap items-center gap-2 ">
            <Button
              onClick={() =>
                handleAddToWishlist(isWishlisted, addToWishlist, item)
              }
              variant="outline"
              size="sm"
              className="rounded-lg  py-2 "
            >
              <Heart size={16} />
            </Button>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              size="sm"
              className="rounded-lg py-2"
            >
              <Trash2 size={16} />
            </Button>
            {/* Confirm Dialog */}
            <ConfirmDeleteDialog
              open={open}
              onOpenChange={setOpen}
              onConfirm={() => {
                removeFromCart(item.cartItemId);
                setOpen(false);
                toast.success("Removed from cart");
              }}
            />
          </div>

          {/* Quantity */}
          <div className="flex items-center self-start sm:self-auto gap-2 rounded-lg border">
            <button
              onClick={() =>
                updateQuantity({
                  cartItemId: cartItemId,
                  quantity: quantity - 1,
                })
              }
              className="cursor-pointer px-3 py-2 rounded-l-lg hover:bg-brand-main-trans transition"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-[32px] text-center text-lg font-medium">
              {quantity}
            </span>

            <button
              onClick={() =>
                updateQuantity({
                  cartItemId: cartItemId,
                  quantity: quantity + 1,
                })
              }
              className="cursor-pointer px-3 py-2 rounded-r-lg hover:bg-brand-main-trans transition"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
