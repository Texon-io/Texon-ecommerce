import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full" />
        </div>
    );
}

export default ProductCardSkeleton;
