import {useNavigate} from "react-router";
import {useMutation} from "@tanstack/react-query";
import {login as loginAPI} from "@/services/apiAuth.js";
import {toast} from "sonner";

export function useLogin(){
    const navigate = useNavigate();

    const{mutate: login,
    isPending:isLoading} = useMutation({
        mutationKey:["login"],
        mutationFn: ({email, password})=>loginAPI({email, password}),
        onSuccess: () => {
            toast.success("Logged in successfully.");
            navigate("/dashboard");
        },
        onError: (err) => {
            console.error(err);
            toast.error(err.message || "Login failed. Try again.");
        },
    });

    return { login, isLoading };
}