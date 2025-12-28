import Button from "@/components/ui/Button";
import { ShoppingBag, Trash2 } from "lucide-react";
import ProductPrice from "../../components/ui/ProductPrice";
import { useState } from "react";
import { useWishlistActions } from "./useWishlist";
import ConfirmDeleteDialog from "../../components/ui/ConfirmDeleteDialog";
import { toast } from "sonner";
import DeleteSwipe from "./DeleteSwipe";

export default function WishlistItem({ item }) {
  const { removeFromWishlist, isRemoving } = useWishlistActions();
  const [open, setOpen] = useState(false);

  const { title, description, price, discount, image_url, stock } = item;
  let isInStock = stock > 0;

  return (
    <DeleteSwipe isRemoving={isRemoving} open={open} setOpen={setOpen}>
      <div
        className="
        relative flex flex-col gap-6
        md:flex-row md:items-center md:gap-8
        rounded-xl border border-border bg-white p-4
      "
      >
        {/* Image */}
        <img
          src={image_url}
          alt={title}
          className="
          h-48 w-full
          md:h-42 md:w-42
          rounded-lg object-cover
          border border-brand-main
        "
        />

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <p
              className={`text-sm font-medium ${
                isInStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {isInStock ? `'${stock}' In Stock` : "Out of Stock"}
            </p>

            <h3 className="mt-1 text-lg md:text-xl font-medium">{title}</h3>

            <p className="mt-1 mb-3 text-sm text-muted-foreground">
              {description}
            </p>

            {/* Price */}
            <ProductPrice
              className="text-lg md:text-xl text-brand-black font-semibold"
              price={price}
              hasDiscount={discount > 0}
              discountPercentage={discount}
            />
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              variant={isInStock ? "main" : "outline"}
              disabled={!isInStock}
              size="sm"
              className="flex rounded-md px-4 items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              {isInStock ? "Add to cart" : "Explore similar"}
            </Button>
          </div>
        </div>

        {/* Remove */}
        <button
          onClick={() => setOpen(true)}
          className="
          absolute top-4 right-4
          md:static
          text-muted-foreground
          cursor-pointer p-2
          border border-gray-300 rounded-lg
          bg-gray-100
          hover:text-red-500 transition
        "
        >
          <Trash2 size={20} />
        </button>
        {/* Confirm Dialog */}
        <ConfirmDeleteDialog
          open={open}
          onOpenChange={setOpen}
          onConfirm={() => {
            removeFromWishlist(item.id);
            setOpen(false);
            toast.success("Removed from wishlist");
          }}
        />
      </div>
    </DeleteSwipe>
  );
}
