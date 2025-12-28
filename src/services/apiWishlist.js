import { supabase } from "@/lib/Supabase.js";

// Wishlist of the authenticated user
export async function getWishlist() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("wishlist_items")
    .select("*, products:product_id(*)") // Join with products table
    .eq("user_id", user.id);

  if (error) throw error;

  // Extract products from wishlist items
  const wishlistProducts = data?.map((item) => item.products) ?? [];

  return wishlistProducts;
}

// Add a product to the wishlist
export async function addToWishlist(productId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Check if the product is already in the wishlist
  const { data: existing } = await supabase
    .from("wishlist_items")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle(); // Get single record or null

  if (existing) {
    throw new Error("Product already in wishlist");
  }

  const { error } = await supabase.from("wishlist_items").insert({
    user_id: user.id,
    product_id: productId,
  });

  if (error) throw error;

  return { success: true };
}

// Remove a product from the wishlist
export async function removeFromWishlist(productId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("wishlist_items")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId);

  if (error) throw error;

  return { success: true };
}

// Check if a product is in the wishlist
export async function isInWishlist(productId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("wishlist_items")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  return !!data;
}
