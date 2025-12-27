import { useMutation } from "@tanstack/react-query";
import { forgetPassword as recoverPasswordAPI } from "@/services/apiAuth.js";
import { toast } from "sonner";

export function useRecoverPassword() {

    const { mutate: recoverPassword, isPending: isLoading, error } = useMutation({
        mutationFn: ({ email }) => recoverPasswordAPI({ email }),
        mutationKey: ["forgetPassword"],
        onSuccess: () => {
            toast.success("Email sent successfully., Check you Inbox");
        },
        onError: (err) => {
            console.error(err);
            toast.error(err.message || "Email sending failed. Please try again later.");
        },
    });

    return { recoverPassword, isLoading, error };
}