import {useMutation} from "@tanstack/react-query";
import {updateUserData} from "@/services/apiAuth.js";
import {toast} from "sonner";

export function useUpdateData() {
    const {mutate: updateData , isPending} = useMutation(({
        mutationFn: ({newPassword, fullName}) => updateUserData({newPassword, fullName}),
        mutationKey: ["updateUserData"],
        onSuccess: () =>toast.success("User Data updated successfully"),
        onError: () =>toast.error("User Data update failed")
    }))

    return {updateData, isPending}
}