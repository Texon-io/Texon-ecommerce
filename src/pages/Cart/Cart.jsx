import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { useCart, useCartActions } from "./useCart";
import HandleEmptyState from "../../components/ui/HandleEmptyState";
import { PageSkeletonLoading } from "@/components/ui/PageSkeletonLoading";
import { PageError } from "@/components/ui/PageError";
import ConfirmDeleteDialog from "@/components/ui/ConfirmDeleteDialog";
import { useState } from "react";
import { toast } from "sonner";
import Button from "@/components/ui/Button";

export default function Cart() {
  const { cartItems, totalItems, isLoading, error } = useCart();
  const { clearCart } = useCartActions();
  const [open, setOpen] = useState(false);

  console.log(cartItems);

  return (
    <section className="mx-auto max-w-7xl px-3 md:px-14 py-12">
      {/* Header */}
      <div
        className="mb-8 flex flex-col md:flex-row gap-2
                   items-start md:items-center justify-between"
      >
        <h1 className="text-3xl font-semibold text-brand-black">
          Shopping Cart ({totalItems || "#"})
        </h1>
        {totalItems > 0 && !isLoading && (
          <Button
            className="rounded-lg self-end"
            size="sm"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            Clear Cart
          </Button>
        )}
        {/* Confirm Dialog */}
        <ConfirmDeleteDialog
          title="Remove all items?"
          description="Are you sure you want to remove all items from your cart?"
          open={open}
          onOpenChange={setOpen}
          onConfirm={() => {
            clearCart();
            setOpen(false);
            toast.success("Removed from cart");
          }}
        />
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
