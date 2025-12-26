import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { HeartCrack } from "lucide-react";

export default function WishlistEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="animate-[fadeUp_0.4s_ease-out] flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-20 text-center">
      {/* Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-main/10">
        <HeartCrack className="text-brand-main animate-pulse" size={32} />
      </div>

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-brand-black">
        Your wishlist is empty
      </h2>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Browse our products and add items to your wishlist to keep track of your
        favorite finds.
      </p>

      {/* Action */}
      <Button
        onClick={() => navigate("/shop")}
        className="mt-6 px-6"
        variant="main"
      >
        Explore products
      </Button>
    </div>
  );
}
