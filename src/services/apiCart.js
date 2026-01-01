import { supabase } from "@/lib/Supabase.js";

// Getting the cart (with product details and quantities)
export async function getCart() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("cart_items")
    .select("*, products:product_id(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false }); // Newest first

  if (error) throw error;

  // Adding product details to cart items
  const cartItems =
    data?.map((item) => ({
      ...item.products,
      quantity: item.quantity,
      cartItemId: item.id, // ID of the cart item itself
    })) ?? [];

  return cartItems;
}

// Adding a product to the cart
export async function addToCart(productId, quantity = 1) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("cart_items").insert({
    user_id: user.id,
    product_id: productId,
    quantity,
  });

  if (error) throw error;

  return { success: true };
}

// Updating quantity of a cart item
export async function updateCartQuantity(cartItemId, newQuantity) {
  if (newQuantity <= 0) {
    return removeFromCart(cartItemId); // If quantity is 0 or less, remove the item
  }

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity: newQuantity })
    .eq("id", cartItemId);

  if (error) throw error;

  return { success: true };
}

// Removing an item from the cart
export async function removeFromCart(cartItemId) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId);

  if (error) throw error;

  return { success: true };
}

// Clearing the entire cart for the user
export async function clearCart() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id);

  if (error) throw error;

  return { success: true };
}

// Check if a product is already in the cart
export async function isProductInCart(productId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { isInCart: false };
  }

  const { data, error } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  // If no data, the product is not in the cart
  if (!data) {
    return { isInCart: false };
  }

  if (error) throw error;

  return {
    isInCart: true,
  };
}
