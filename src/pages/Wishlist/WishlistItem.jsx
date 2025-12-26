import Button from "@/components/ui/Button";
import { ShoppingBag, Trash2 } from "lucide-react";
import ProductPrice from "../../components/ui/ProductPrice";
import { useState } from "react";

export default function WishlistItem({ item }) {
  const [startX, setStartX] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    // Only allow left swipe
    if (diff < 0) {
      setTranslateX(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);

    if (translateX < -120) {
      // TODO: DELETE
      //   onDelete(item.id);
    } else {
      // Reset position
      setTranslateX(0);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Delete Background */}
      <div className="absolute inset-0 flex items-center justify-end pr-6 rounded-xl bg-red-200">
        <Trash2 className="text-red-500" size={28} />
      </div>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isSwiping ? "none" : "transform 0.3s ease",
        }}
        className="relative"
      >
        <div
          className="
        relative flex flex-col gap-6
        md:flex-row md:items-center md:gap-8
        rounded-xl border border-border bg-white p-4
      "
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.title}
            className="
          h-48 w-full
          md:h-42 md:w-42
          rounded-lg object-cover
          border border-brand-main
        "
          />

          {/* Info */}
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <p
                className={`text-sm font-medium ${
                  item.inStock ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.inStock ? "In Stock" : "Out of Stock"}
              </p>

              <h3 className="mt-1 text-lg md:text-xl font-medium">
                {item.title}
              </h3>

              <p className="mt-1 mb-3 text-sm text-muted-foreground">
                {item.description}
              </p>

              {/* Price */}
              <ProductPrice
                className="text-lg md:text-xl text-brand-black font-semibold"
                price={item.price}
                hasDiscount={item.hasDiscount}
                discountPercentage={item.discountPercentage}
              />
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                variant={item.inStock ? "main" : "outline"}
                disabled={!item.inStock}
                size="sm"
                className="flex rounded-md px-4 items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                {item.inStock ? "Add to cart" : "Explore similar"}
              </Button>
            </div>
          </div>

          {/* Remove */}
          <button
            className="
          absolute top-4 right-4
          md:static
          text-muted-foreground
          cursor-pointer p-2
          border border-gray-300 rounded-lg
          bg-gray-100
          hover:text-red-500 transition
        "
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
