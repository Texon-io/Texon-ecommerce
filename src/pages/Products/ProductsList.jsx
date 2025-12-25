import { useProducts } from "./useProducts";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";
import { Spinner } from "@/components/ui/spinner.jsx";
import Indicator from "@/components/ui/Indicator.jsx";
import {useSearchStore} from "@/pages/Products/searchProducts.js";

function ProductsList() {
    const {
        products,
        fetchMoreProducts,
        hasMore,
        isLoading,
        isFetching,
        totalCount,
        loadedCount,
    } = useProducts();

    const {filtered} = useSearchStore()

    // Loading
    if (isLoading) {
        return (
            <div className="flex-center py-20">
                <Spinner className="size-12" />
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-sm:justify-items-center">
                {(filtered || products).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalCount > 0 && (
                <div className="max-w-md mx-auto my-8">
                    <Indicator total={totalCount} loaded={loadedCount}/>
                </div>
            )}

            <div className="flex-center mt-12">
                {isFetching && <Spinner className="size-8" />}

                {hasMore && !isFetching && (
                    <Button
                        variant="outline"
                        onClick={fetchMoreProducts}
                        className="px-16"
                    >
                        Show more
                    </Button>
                )}
            </div>
        </>
    );
}

export default ProductsList;