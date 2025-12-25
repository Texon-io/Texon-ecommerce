import { useState, useEffect } from "react";
import { supabase } from "@/lib/Supabase";

const PAGE_SIZE = 12;

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        async function getTotal() {
            const { count } = await supabase
                .from("products")
                .select("*", { count: "exact", head: true });
            setTotalCount(count || 0);
        }
        getTotal();
    }, []);

    async function fetchMoreProducts() {
        setIsFetching(true);
        const from = page * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        const { data, error } = await supabase
            .from("products")
            .select("*")
            .range(from, to);

        if (error) {
            console.error(error);
            setIsFetching(false);
            return;
        }

        setProducts(prev => [...prev, ...data]);
        setPage(prev => prev + 1);

        if (data.length < PAGE_SIZE) setHasMore(false);
        setIsFetching(false);
    }

    useEffect(() => {
        fetchMoreProducts();
    }, []);

    const loadedCount = products.length;

    return {
        products,
        fetchMoreProducts,
        hasMore,
        isLoading: products.length === 0 && page === 0,
        isFetching,
        totalCount,
        loadedCount
    };
}