import { toast } from "sonner";

export const handleAddToWishlist = async (
  isWishlisted,
  addToWishlist,
  product
) => {
  try {
    if (isWishlisted) {
      toast.error("Item is already in wishlist");
      return;
    }
    await addToWishlist(product.id);
    toast.success("Item added to wishlist successfully");
    // Use Toast or any notification to inform user
  } catch (err) {
    console.error(err);
  }
};

export const handleAddToCart = async (existingItem, addToCart, product) => {
  try {
    if (existingItem) {
      toast.success("Item is already in cart");
      return;
    }
    await addToCart({ productId: product.id });
    toast.success("Item added to cart successfully");
    // Use Toast or any notification to inform user
  } catch (err) {
    console.error(err);
  }
};
