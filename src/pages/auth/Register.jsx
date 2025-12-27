import { toast, Toaster } from "sonner";
import { useState } from "react";
import {Link} from "react-router-dom";

import { useRegister } from "@/pages/auth/useRegister.js";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import { Spinner } from "@/components/ui/spinner.jsx";
import { categ04 } from "@/utils/constants.js";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [terms, setTerms] = useState(false);

    const { signup, isLoading } = useRegister();

    async function handleRegister(e) {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            return toast.error("All fields required");
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords don't match");
        }

        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return toast.error("Invalid email format");
        }

        if (!terms) {
            return toast.error("Accept terms and privacy policy");
        }

        signup({ email, password }, {
            onSettled: ()=>{
            setEmail("")
            setPassword("");
            setConfirmPassword("");
            setTerms(false);
            }
        });
    }

    return (
        <section className="min-h-screen bg-white flex flex-col items-center justify-start py-4 px-6 gap-2">

            <h1 className="text-2xl font-semibold">Create An Account</h1>

            <div className="max-w-48">
                <img src={categ04} alt="table-product" className="w-full" />
            </div>
            <h5 className="font-medium text-xl">Let's get your account set up</h5>

            <form onSubmit={handleRegister} className={`w-full max-w-sm flex flex-col gap-1`}>
                <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" name="email" />
                <Input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" name="password" />
                <Input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" type="password" name="confirmPassword" />

                <div className="flex items-center gap-3 mt-4">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={terms}
                        onChange={e => setTerms(e.target.checked)}
                        className="w-5 h-5 checked:bg-brand-main"
                    />
                    <label htmlFor="terms" className="text-gray-700 text-sm">
                        I agree to the Terms and Conditions and acknowledge the Privacy Policy
                    </label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? <Spinner className="size-5" /> : "Create Account"}
                </Button>
            </form>
            <p className={`text-gray-500 text-sm`}>Already have an account? <Link className={`text-brand-main text-base font-medium hover:text-brand-main/90`} to={"/login"}>Login</Link></p>
        </section>
    );
}

export default Register;
