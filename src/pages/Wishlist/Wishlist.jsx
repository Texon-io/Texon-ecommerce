import { Spinner } from "@/components/ui/spinner.jsx";
import {
  useWishlist,
  useWishlistActions,
  useWishlistCount,
} from "./useWishlist.js";
import WishlistEmptyState from "../../components/ui/HandleEmptyState.jsx";
import WishlistItem from "./WishlistItem.jsx";
import { PageError } from "@/components/ui/PageError.jsx";
import { PageSkeletonLoading } from "@/components/ui/PageSkeletonLoading.jsx";
import Button from "@/components/ui/Button.jsx";
import { useState } from "react";
import ConfirmDeleteDialog from "@/components/ui/ConfirmDeleteDialog.jsx";
import { toast } from "sonner";

// const wishlist = [
//   {
//     id: 1,
//     title: "Auria Fabric Accent Chair",
//     description:
//       "A luxurious and comfortable fabric accent chair perfect for any living room or bedroom.",
//     image: "../../../public/images/Image-1.png",
//     hasDiscount: true,
//     discountPercentage: 18,
//     price: 299,
//     inStock: true,
//   },
//   {
//     id: 2,
//     title: "Metro Luxe Duo Sofa",
//     description:
//       "A stylish and comfortable duo sofa perfect for any living room or bedroom.",
//     image: "../../../public/images/Image-4.png",
//     hasDiscount: false,
//     discountPercentage: 0,
//     price: 499,
//     inStock: false,
//   },
// ];

export default function Wishlist() {
  const { data: products, isLoading, error } = useWishlist();
  const { clearWishlist } = useWishlistActions();
  const { data: wishlistCount } = useWishlistCount();
  const [open, setOpen] = useState(false);

  const safeProducts = products ?? [];

  // console.log(safeProducts);

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div
        className={`flex flex-col md:flex-row gap-2
                   items-start md:items-center justify-between mb-8 `}
      >
        <h1 className=" text-2xl font-semibold">
          My Wishlist ({isLoading ? "#" : wishlistCount})
        </h1>
        {wishlistCount > 0 && !isLoading && (
          <Button
            className="rounded-lg self-end"
            size="sm"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            Clear Wishlist
          </Button>
        )}
        {/* Confirm Dialog */}
        <ConfirmDeleteDialog
          title="Remove all items?"
          description="Are you sure you want to remove all items from your wishlist?"
          open={open}
          onOpenChange={setOpen}
          onConfirm={() => {
            clearWishlist();
            setOpen(false);
            toast.success("Removed from wishlist");
          }}
        />
      </div>

      {error && <PageError message={error.message} />}
      {isLoading && <PageSkeletonLoading />}

      {wishlistCount === 0 ? (
        <WishlistEmptyState page="wishlist" />
      ) : (
        <div className="space-y-6">
          {safeProducts.map((item) => (
            <WishlistItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
