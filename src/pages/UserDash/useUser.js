import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/services/apiAuth";

export function useUser() {
    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getUserData,
    });

    return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}