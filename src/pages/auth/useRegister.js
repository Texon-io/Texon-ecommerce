import { useMutation } from "@tanstack/react-query";
import { signUp as signupAPI } from "@/services/apiAuth.js";
import { useNavigate } from "react-router-dom"; // Fixed: react-router-dom
import { toast } from "sonner";

export function useRegister() {
    const navigate = useNavigate();

    const { mutate: signup, isPending: isLoading, error } = useMutation({
        mutationFn: ({ email, password }) => signupAPI({ email, password }),
        mutationKey: ["signup"],
        onSuccess: () => {
            toast.success("Account created successfully.");
            navigate("/");
        },
        onError: (err) => {
            console.error(err);
            toast.error(err.message || "Signup failed. Try again.");
        },
    });

    return { signup, isLoading, error };
}