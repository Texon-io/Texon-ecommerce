import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from "@/services/apiWishlist.js";

export function useWishlist() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });
}

export function useWishlistCount() {
  return useQuery({
    queryKey: ["wishlist", "count"],
    queryFn: getWishlist,
    select: (data) => data.length,
  });
}

export function useWishlistActions() {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  return {
    addToWishlist: addMutation.mutateAsync,
    removeFromWishlist: removeMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
    addError: addMutation.error,
    removeError: removeMutation.error,
  };
}

export function useIsInWishlist(productId) {
  return useQuery({
    queryKey: ["wishlist", "check", productId],
    queryFn: () => isInWishlist(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
}
