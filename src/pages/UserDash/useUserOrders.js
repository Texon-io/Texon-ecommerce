import {useQuery} from "@tanstack/react-query";
import {getUserOrders} from "@/services/apiOrders.js";

export function useUserOrders(userId) {
    const { data: orders, isLoading, isError } = useQuery({
        queryKey: ['orders', userId],
        queryFn: () => getUserOrders(userId),
        enabled: !!userId,
    });

    return { orders, isLoading, isError };
}