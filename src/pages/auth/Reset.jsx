import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import { Spinner } from "@/components/ui/spinner.jsx";
import {categ04} from "@/utils/constants.js";
import { supabase } from "@/lib/Supabase.js";  // مهم جداً

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isRecovery, setIsRecovery] = useState(false);

    const navigate = useNavigate();

    // استمع للـ event لما اللينك يفتح
    useEffect(() => {
        supabase.auth.onAuthStateChange((event, _session) => {
            if (event === "PASSWORD_RECOVERY") {
                setIsRecovery(true);
            }
        });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!password || !confirmPassword) return toast.error("All fields required");
        if (password !== confirmPassword) return toast.error("Passwords don't match");
        if (password.length < 6) return toast.error("Password must be at least 6 characters");

        setIsLoading(true);
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            toast.error(error.message || "Failed to update password");
        } else {
            toast.success("Password updated successfully!");
            navigate("/login");  // أو "/"
        }
        setIsLoading(false);
    }

    // لو مش في وضع recovery، يعني اللينك غلط أو منتهي
    if (!isRecovery) {
        return (
            <section className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-red-500">Invalid or expired reset link.</p>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-white flex flex-col items-center justify-center py-8 px-6 gap-6">
            <h1 className="text-2xl font-semibold">Reset Password</h1>

            <div className="max-w-48">
                <img src={categ04} alt="table-product" className="w-full" />
            </div>

            <h5 className="text-lg text-center">Enter your new password</h5>

            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-1">
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    type="password"
                />
                <Input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    type="password"
                />

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? <Spinner className="size-5" /> : "Update Password"}
                </Button>
            </form>

            <p className="text-gray-500 text-sm">
                Remembered? <Link to="/login" className="text-brand-main font-medium">Back to login</Link>
            </p>
        </section>
    );
}

export default ResetPassword;