import { Spinner } from "@/components/ui/spinner.jsx";
import { useWishlist, useWishlistCount } from "./useWishlist.js";
import WishlistEmptyState from "../../components/ui/HandleEmptyState.jsx";
import WishlistItem from "./WishlistItem.jsx";
import { PageError } from "@/components/ui/PageError.jsx";
import { PageSkeletonLoading } from "@/components/ui/PageSkeletonLoading.jsx";

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
  const { data: wishlistCount } = useWishlistCount();

  const safeProducts = products ?? [];

  // console.log(safeProducts);

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-semibold">
        My Wishlist ({isLoading ? "#" : wishlistCount})
      </h1>

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
