import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  isProductInCart,
} from "@/services/apiCart.js";

// Getting the cart
export function useCart() {
  const {
    data: cartItems = [], // Always an array even if undefined
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  // Calculating totals (very useful in the Cart Page)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    cartItems,
    totalItems,
    totalPrice,
    error,
    isLoading,
    isError,
    refetch,
  };
}

export function useIsInCart(productId) {
  return useQuery({
    queryKey: ["cart", "exists", productId],
    queryFn: () => isProductInCart(productId),
    enabled: !!productId, // No need to run if no productId
    staleTime: 1 * 60 * 1000, // 1 minute
    select: (data) => ({
      isInCart: data.isInCart,
      isLoading: false, // to avoid confusion with useQuery's isLoading
    }),
  });
}

// Mutations للـ add/update/remove/clear
export function useCartActions() {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: ({ productId, quantity = 1 }) => addToCart(productId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }) =>
      updateCartQuantity(cartItemId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const clearMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  return {
    addToCart: addMutation.mutateAsync,
    updateQuantity: updateMutation.mutateAsync,
    removeFromCart: removeMutation.mutateAsync,
    clearCart: clearMutation.mutateAsync,

    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isRemoving: removeMutation.isPending,
    isClearing: clearMutation.isPending,
  };
}
