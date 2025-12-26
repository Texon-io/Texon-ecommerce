import {supabase} from "@/lib/Supabase.js";

export async function getProducts({ pageParam = 0, category }) {
    const PAGE_SIZE = 12;
    const from = pageParam * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
        .from("products")
        .select("*", { count: "exact" })
        .range(from, to);

    if (category && category !== "All") {
        query = query.eq("category", category);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    const hasMore = (pageParam + 1) * PAGE_SIZE < count;

    return {
        data: data ?? [],
        nextCursor: hasMore ? pageParam + 1 : undefined,
    };
}

