import Button from "@/components/ui/Button";
import { useCart } from "./useCart";

export function CartSummary() {
  const { totalPrice } = useCart();
  return (
    <div className="sticky top-24 h-fit rounded-xl border border-border bg-white p-6">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="mt-6 space-y-3 text-sm">
        <SummaryRow label="Subtotal" value="$320.00" />
        <SummaryRow label="Shipping" value="$10.00" />
        <SummaryRow label="Discount" value="-$20.00" />
      </div>

      <div className="my-4 h-px bg-border" />

      <SummaryRow label="Total" value={`$${totalPrice.toFixed(2)}`} strong />

      <Button className="mt-6 w-full" variant="main">
        Proceed to Checkout
      </Button>
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
