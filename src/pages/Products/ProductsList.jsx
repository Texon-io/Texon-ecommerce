import { Spinner } from "@/components/ui/spinner.jsx";
import { toast } from "sonner";
import { useMemo } from "react";

import { useSearchStore } from "@/pages/Products/searchProducts.js";
import { useSortProducts } from "@/pages/Products/sortProducts.js";
import { useProducts } from "@/pages/Products/useProducts.js";

import Button from "@/components/ui/Button.jsx";
import ProductCard from "@/components/ui/ProductCard.jsx";
import EmptyState from "@/components/ui/EmptyState.jsx";
import { categoriesStore } from "@/pages/Products/categoriesStore.js";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton.jsx";

function ProductsList() {
  const { category } = categoriesStore();
  const { searchTerm } = useSearchStore();
  const { sortMethod } = useSortProducts();

  const {
    status,
    products,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
  } = useProducts(category);

  const displayedProducts = useMemo(() => {
    if (!products?.length) return [];

    let result = [...products];

    // 1️⃣ Category filter
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    // 2️⃣ Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(term));
    }

    // 3️⃣ Sort
    result.sort((a, b) => {
      if (sortMethod === "price-low") return a.price - b.price;
      if (sortMethod === "price-high") return b.price - a.price;
      if (sortMethod === "newest-first")
        return new Date(b.created_at) - new Date(a.created_at);
      if (sortMethod === "oldest-first")
        return new Date(a.created_at) - new Date(b.created_at);
      return 0;
    });

    return result;
  }, [products, category, searchTerm, sortMethod]);

  if (status === "pending") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (status === "error") {
    toast.error("Error fetching products");
    return null;
  }

  if (!displayedProducts.length) {
    return (
      <EmptyState
        title="No products found"
        description="Try changing the category or search keyword."
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-sm:justify-items-center">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasNextPage && displayedProducts.length > 0 && (
        <div className="flex-center mt-12">
          <Button
            variant="outline"
            onClick={fetchNextPage}
            disabled={isFetching || !hasNextPage}
            className="px-16"
          >
            {isFetchingNextPage ? "Loading more..." : "Show more"}
          </Button>
        </div>
      )}
    </>
  );
}
export default ProductsList;
