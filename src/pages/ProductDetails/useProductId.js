import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/apiProductId";
import { useParams } from "react-router-dom";

export function useProductId() {
  const { id } = useParams();

  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    retry: false, // No need to retry
  });

  return { isLoading, product, error };
}
