import {useInfiniteQuery} from "@tanstack/react-query";
import {getProducts} from "@/services/apiProducts.js";

export function useProducts(category) {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } =  useInfiniteQuery({
        queryKey: ["products", category],
        queryFn: ({ pageParam = 0 }) =>
            getProducts({ pageParam, category }),
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    const products = data?.pages.flatMap(page => page.data) ?? [];




    return {status, products, error, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching}
}
