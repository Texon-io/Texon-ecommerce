import {useEffect, useState} from "react";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import {toast} from "sonner";
import {useUpdateData} from "@/pages/UserDash/useUpdateData.js";
import {Spinner} from "@/components/ui/spinner.jsx";
import {useUser} from "@/pages/UserDash/useUser.js";
import {useQueryClient} from "@tanstack/react-query";


const AccountSettings = () => {
    const{user} = useUser();
    const queryClient = useQueryClient()
    const [name, setName] = useState(" ");
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const {updateData, isPending} = useUpdateData()

    useEffect(() => {
        if (user?.user_metadata?.full_name) {
            setName(user.user_metadata.full_name);
        }
    }, [user]);

    function handleUpdateFullname(){
        if (!name) toast.error("Name is required")
        else updateData({fullName: name}, {
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['user']})
        })
    }

    function handleUpdatePassword() {
        if(newPassword.length < 8) toast.error("Password must be at least 8 characters long");
        else if (newPassword !== confirmPassword) toast.error("Passwords don't match");
        else updateData({newPassword}, {
            onSettled: () =>{
                setNewPassword('')
                setConfirmPassword('')
            }
            });
    }

    return (
    <div className={`space-y-4`}>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-brand-black">Edit Account Details</h2>
            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-brand-black mb-1">Full Name</label>
                    <Input type={`text`} value={name} onChange={(e)=> setName(e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-brand-black mb-1">E-Mail</label>
                    <Input type="text"
                           value={`abdo@example.com`}
                           disabled
                           placeholder="••••••••"/>
                </div>
                <div className={`w-full text-right space-x-4`}>
                    <Button variant={`outline`}
                            onClick={() =>setName("Abdulrahman")}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateFullname}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-brand-black">Edit Password</h2>
            <div className="space-y-5">
                <div>
                    <Input label={`password`} type={`password`} value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} />
                </div>
                <div>
                    <Input label={`Confirm password`} placeholder={''} type={`password`} value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}    />
                </div>
                <div className={`w-full text-right space-x-4`}>
                    <Button variant={`outline`}
                            onClick={() =>setName("Abdulrahman")}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdatePassword}>
                        {isPending ? <Spinner className={`size-5`}/> :"Save Changes"}
                    </Button>
                </div>
            </div>
        </div>

    </div>
    );
};
export default AccountSettings;