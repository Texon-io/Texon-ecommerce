import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { useCart } from "./useCart";
import HandleEmptyState from "../../components/ui/HandleEmptyState";
import { PageSkeletonLoading } from "@/components/ui/PageSkeletonLoading";
import { PageError } from "@/components/ui/PageError";

export default function Cart() {
  const { cartItems, totalItems, isLoading, error } = useCart();

  // if (error) return <PageError message={error.message} />;

  // if (isLoading) {
  //   return (
  //     <section className="mx-auto max-w-7xl px-3 md:px-14 py-12">
  //       <PageSkeletonLoading />
  //     </section>
  //   );
  // }

  // if (cartItems.length === 0) {
  //   return (
  //     <section className="mx-auto max-w-7xl px-3 md:px-14 py-12">
  //       <HandleEmptyState page="cart" />
  //     </section>
  //   );
  // }
  console.log(cartItems);

  return (
    <section className="mx-auto max-w-7xl px-3 md:px-14 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-brand-black">
          Shopping Cart ({totalItems || "#"})
        </h1>
      </div>

      {/* Loading state */}
      {isLoading && <PageSkeletonLoading />}
      {/* Error state */}
      {error && <PageError message={error.message} />}

      {/* Empty state */}
      {cartItems.length === 0 && <HandleEmptyState page="cart" />}

      {!isLoading && cartItems.length > 0 && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <CartSummary />
        </div>
      )}
    </section>
  );
}
