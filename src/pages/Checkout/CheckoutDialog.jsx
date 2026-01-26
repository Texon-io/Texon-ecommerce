import { useState } from "react";
import { supabase } from "@/lib/Supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ButtonShadcn } from "@/components/ui/button-shadcn";
import Button from "@/components/ui/Button";
import { Input as ShadInput } from "@/components/ui/input-shadcn";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, TicketPercent } from "lucide-react";
import { useCart } from "../Cart/useCart";

export default function CheckoutDialog({ onOpenChange, open }) {
  const [promoCode, setPromoCode] = useState("");
  const [discountInfo, setDiscountInfo] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);

  const { cartItems, totalPrice } = useCart();

  // 1. Validating the promocode
  const validatePromo = async () => {
    if (!promoCode) return;
    setIsValidating(true);

    try {
      const { data, error } = await supabase
        .from("promocodes")
        .select("*")
        .eq("code", promoCode.trim())
        .eq("is_active", true)
        .single();

      if (error || !data) {
        toast.error(`There is no promocode with code "${promoCode}"`);
        setDiscountInfo(null);
      } else if (data.is_active === false) {
        toast.error(`Promocode "${promoCode}" is not active`);
        setDiscountInfo(null);
      } else if (data.min_order_amount > totalPrice) {
        toast.error(
          `Promocode "${promoCode}" is valid for orders above '${data.min_order_amount}$'`,
        );
        setDiscountInfo(null);
      } else {
        console.log(data);
        setDiscountInfo(data);
        toast.success(
          `Promocode "${promoCode}" has a discount of '${data.discount_percentage}%'`,
        );
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(`there is error ${err.message}`);
    } finally {
      setIsValidating(false);
    }
  };

  // 2. The place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsOrdering(true);

    try {
      // Check if the user is logged in
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("You must be logged in to place an order.");
        setIsOrdering(false);
        return;
      }

      // Formatting the cart items
      const formattedItems = cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      // RPC - To place the order
      const { error: rpcError } = await supabase.rpc("place_order_with_promo", {
        p_user_id: user.id, // Get it from the session
        p_promo_code: promoCode.trim() || null,
        p_cart_items: formattedItems,
      });

      if (rpcError) throw rpcError;

      toast.success("Order placed successfully!");

      if (onOpenChange) onOpenChange();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            Checkout <TicketPercent className="w-6 h-6 text-brand-main" />
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handlePlaceOrder}>
          {/* User Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 text-left">
              <Label>First Name</Label>
              <ShadInput placeholder="Ramez" required />
            </div>
            <div className="space-y-1 text-left">
              <Label>Last Name</Label>
              <ShadInput placeholder="Khaled" required />
            </div>
          </div>

          <div className="space-y-1 text-left">
            <Label>Mobile Phone</Label>
            <ShadInput placeholder="+20 1xxxxxxxxx" required />
          </div>

          <div className="space-y-1 text-left">
            <Label>Address</Label>
            <ShadInput placeholder="Street, City, Country" required />
          </div>

          {/* Promo Code */}
          <div className="space-y-2 text-left">
            <Label>Promo Code</Label>
            <div className="flex items-center gap-2">
              <ShadInput
                placeholder="Promo code if it exists"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className={`flex-1 transition-all ${
                  discountInfo ? "border-green-500 ring-2 ring-green-100" : ""
                }`}
              />
              <ButtonShadcn
                type="button"
                variant="outline"
                disabled={isValidating || !promoCode}
                onClick={validatePromo}
                className="h-10 px-4 bg-brand-main-trans"
              >
                {isValidating ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Apply"
                )}
              </ButtonShadcn>
            </div>
            {discountInfo && (
              <p className="text-xs text-green-600 font-bold">
                Discounted Percentage is Done:{" "}
                {discountInfo.discount_percentage}%
              </p>
            )}
          </div>

          {/* To place the order */}
          <Button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-2 text-lg"
            disabled={isOrdering || cartItems.length === 0}
          >
            {isOrdering ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Order...
              </>
            ) : (
              "Confirm Order"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
