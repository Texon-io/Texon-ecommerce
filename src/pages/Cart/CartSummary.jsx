import Button from "@/components/ui/Button";
import { useCart } from "./useCart";
import CheckoutDialog from "./CheckoutDialog";
import { useState } from "react";

export function CartSummary({ shippingValue = 10 }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { totalPrice } = useCart();
  return (
    <div className="sticky top-24 h-fit rounded-xl border border-border bg-white p-6">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="mt-6 space-y-3 text-sm">
        <SummaryRow label="Subtotal" value={`$${totalPrice.toFixed(2)}`} />
        <SummaryRow label="Shipping" value={`$${shippingValue.toFixed(2)}`} />
      </div>

      <div className="my-4 h-px bg-border" />

      <SummaryRow
        label="Total"
        value={`$${(totalPrice + shippingValue).toFixed(2)}`}
        strong
      />

      <Button
        onClick={() => setIsCheckoutOpen(true)}
        className="mt-6 w-full"
        variant="outline"
      >
        Proceed Order
      </Button>
      {/* Checkout Dialog */}
      {isCheckoutOpen && (
        <CheckoutDialog onClose={() => setIsCheckoutOpen(false)} />
      )}
    </div>
  );
}

function SummaryRow({ label, value, strong }) {
  return (
    <div className="flex justify-between">
      <span className={strong ? "font-semibold" : "text-muted-foreground"}>
        {label}
      </span>
      <span className={strong ? "font-semibold" : ""}>{value}</span>
    </div>
  );
}
