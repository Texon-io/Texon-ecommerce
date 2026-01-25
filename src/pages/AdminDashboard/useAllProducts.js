import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  addProduct,
  deleteProduct,
  editProduct,
} from "@/services/apiAllProducts.js";

export function useAllProducts(category) {
  const queryClient = useQueryClient();

  // 1. Get products
  const {
    data: products = [],
    error,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getAllProducts({ category }),
  });

  // Calculate the number of products
  const productsCount = products.length;

  // 2. Adding a product
  const { mutate: addProductMutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Update the cache
    },
  });

  // 3. Deleting a product
  const { mutate: deleteProductMutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  // 4. Editing a product
  const { mutate: editProductMutate } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return {
    status,
    products,
    productsCount, // Length of the products
    error,
    isLoading,
    addProduct: addProductMutate,
    deleteProduct: deleteProductMutate,
    editProduct: editProductMutate,
  };
}
