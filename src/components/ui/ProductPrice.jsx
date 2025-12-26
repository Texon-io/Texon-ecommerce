function ProductPrice({
  className = "text-2xl font-bold text-brand-main", // Additional CSS classes
  price, // The original price (required)
  hasDiscount = false, // Is there a discount?
  discountPercentage = 0, // Discount percentage (if any)
}) {
  // Calculate discounted price if applicable
  const discountedPrice = hasDiscount
    ? (price - (price * discountPercentage) / 100).toFixed(2)
    : null;

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {/* The final price (after discount or original) */}
      <p className={`${className}`}>${discountedPrice || price.toFixed(2)}</p>

      {/* The original price */}
      {hasDiscount && (
        <p className="line-through text-sm font-medium text-gray-400 self-end pb-0.5">
          ${price.toFixed(2)}
        </p>
      )}

      {/* Discount badge */}
      {hasDiscount && (
        <span className="text-sm bg-red-200 font-medium ml-6 px-2 py-1 rounded-md text-red-600 animate-pulse">
          {discountPercentage}% off
        </span>
      )}
    </div>
  );
}

export default ProductPrice;
