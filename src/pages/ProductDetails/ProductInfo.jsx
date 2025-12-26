import Button from "../../components/ui/Button";
import { Heart } from "lucide-react";
import { Truck } from "lucide-react";
import { Sprout } from "lucide-react";
import { useState } from "react";
import ProductPrice from "../../components/ui/ProductPrice";

export function ProductInfo({ productdetails }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    console.log("Button clicked!");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{productdetails.title}</h1>
        {/* Description */}
        <p className="text-sm text-brand-gray leading-relaxed ">
          {productdetails.description}
        </p>
        {/* Price */}
        <ProductPrice
          price={productdetails.price}
          hasDiscount={productdetails.hasDiscount}
          discountPercentage={productdetails.discountPercentage}
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground ">
          <Truck size={22} className="inline-block text-brand-secondary" />
          <p className="italic font-medium">Free shipping included</p>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground ">
          <Sprout size={22} className="inline-block text-brand-secondary" />
          <p className="italic font-medium">
            Made from the best of materials sourced
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="main" size="lg" className="flex-1 rounded-lg">
          Add to Cart
        </Button>

        <button
          onClick={handleClick}
          className="rounded-lg border p-3 cursor-pointer hover:bg-gray-100 active:scale-95 transition"
        >
          <Heart
            size={20}
            color={isClicked ? "red" : "black"}
            fill={isClicked ? "red" : "none"}
            strokeWidth={2.3}
          />
        </button>
      </div>
    </div>
  );
}
