import Button from "../../components/ui/Button";
import { Heart } from "lucide-react";
import { Truck } from "lucide-react";
import { Sprout } from "lucide-react";
import { useState } from "react";

export function ProductInfo({ productdetails }) {
  const [isClicked, setIsClicked] = useState(false);

  const discountedPrice = productdetails.hasDiscount
    ? (
        productdetails.price -
        (productdetails.price * productdetails.discountPercentage) / 100
      ).toFixed(2)
    : null;

  const handleClick = () => {
    setIsClicked(!isClicked);
    console.log("Button clicked!");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{productdetails.title}</h1>
        {/* Description */}
        <p className="text-sm text-brand-gray leading-relaxed">
          {productdetails.description}
        </p>
        {/* Price */}
        <div className=" flex items-center gap-1 py-2 ">
          <p className=" text-2xl font-bold text-brand-main">
            ${discountedPrice ? discountedPrice : productdetails.price}
          </p>
          {discountedPrice && (
            <p className="line-through text-sm font-medium text-gray-400 self-end pb-0.5">
              ${productdetails.price.toFixed(2)}
            </p>
          )}
          {productdetails.hasDiscount && (
            <span className="text-sm bg-red-200 font-medium ml-6 px-2 py-1 rounded-md text-red-600">
              {productdetails.discountPercentage}% off
            </span>
          )}
        </div>
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
