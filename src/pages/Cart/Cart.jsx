import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { useCart } from "./useCart";

// const cartItems = [
//   {
//     id: 1,
//     title: "Wooden Sofa Chair",
//     description: "A comfortable wooden sofa chair for your living room.",
//     image: "../../../public/images/Gallery-Image-1.png",
//     price: 120,
//     qty: 2,
//     color: "Brown",
//     inStock: true,
//   },
//   {
//     id: 2,
//     title: "Modern Gaming Chair",
//     description: "A sleek gaming chair perfect for gamers.",
//     image: "../../../public/images/Gallery-Image-2.png",
//     price: 180,
//     qty: 1,
//     color: "Black",
//     inStock: true,
//   },
//   {
//     id: 3,
//     title: "Minimal Wooden Table",
//     description: "A sleek wooden table perfect for modern interiors.",
//     image: "../../../public/images/Gallery-Image-3.png",
//     price: 220,
//     qty: 1,
//     color: "Beige",
//     inStock: false,
//   },
// ];

export default function Cart() {
  const { cartItems, totalItems, isLoading } = useCart();

  if (isLoading) return <div>جاري تحميل السلة...</div>;

  if (cartItems.length === 0) {
    return <div className="text-center py-10">السلة فاضية 🛒</div>;
  }
  console.log(cartItems);

  return (
    <section className="mx-auto max-w-7xl px-3 md:px-14 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-brand-black">
          Shopping Cart ({totalItems})
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Summary */}
        <CartSummary />
      </div>
    </section>
  );
}
