import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {logOut as logOutAPI} from "@/services/apiAuth.js";


export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: logOutAPI,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", { replace: true });
            toast.success("Logged out successfully");
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { logout, isPending };
}