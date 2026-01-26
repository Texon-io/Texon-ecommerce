import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPromos,
  addPromo,
  editPromo,
  deletePromo,
} from "@/services/apiPromos.js";
import { toast } from "sonner";
export function usePromos() {
  const queryClient = useQueryClient();
  const {
    data: promos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["promocodes"],
    queryFn: getPromos,
  });

  //   Calculates

  const activePromos = promos.filter((promo) => promo.is_active).length;

  //   Adding
  const { mutate: addPromoMutate, isLoading: isAdding } = useMutation({
    mutationFn: addPromo,
    onSuccess: () => {
      toast.success("Promo code added!");
      queryClient.invalidateQueries(["promocodes"]);
    },
    onError: (err) => toast.error(err.message),
  });

  // Editing
  const { mutate: editPromoMutate, isLoading: isEditing } = useMutation({
    mutationFn: editPromo,
    onSuccess: () => {
      toast.success("Promo code updated!");
      queryClient.invalidateQueries(["promocodes"]);
    },
    onError: (err) => toast.error(err.message),
  });

  // Deleting
  const { mutate: deletePromoMutate, isLoading: isDeleting } = useMutation({
    mutationFn: deletePromo,
    onSuccess: () => {
      toast.success("Promo code deleted!");
      queryClient.invalidateQueries(["promocodes"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    promos,
    activePromos,
    isLoading,
    error,
    addPromo: addPromoMutate,
    editPromo: editPromoMutate,
    deletePromo: deletePromoMutate,
    isWorking: isAdding || isEditing || isDeleting, // any mutation in progress
  };
}
