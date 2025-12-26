import WishlistEmptyState from "./WishlistEmptyState.jsx";
import WishlistItem from "./WishlistItem.jsx";

const wishlist = [
  {
    id: 1,
    title: "Auria Fabric Accent Chair",
    description:
      "A luxurious and comfortable fabric accent chair perfect for any living room or bedroom.",
    image: "../../../public/images/Image-1.png",
    hasDiscount: true,
    discountPercentage: 18,
    price: 299,
    inStock: true,
  },
  {
    id: 2,
    title: "Metro Luxe Duo Sofa",
    description:
      "A stylish and comfortable duo sofa perfect for any living room or bedroom.",
    image: "../../../public/images/Image-4.png",
    hasDiscount: false,
    discountPercentage: 0,
    price: 499,
    inStock: false,
  },
];

export default function Wishlist() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-semibold">
        My Wishlist ({wishlist.length})
      </h1>

      {wishlist.length === 0 ? (
        <WishlistEmptyState />
      ) : (
        <div className="space-y-6">
          {wishlist.map((item) => (
            <WishlistItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
