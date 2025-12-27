import { toast } from "sonner";
import { useState } from "react";
import {Link} from "react-router-dom";

import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import { Spinner } from "@/components/ui/spinner.jsx";
import {brokenVase} from "@/utils/constants.js";
import {useRecoverPassword} from "@/pages/auth/useRecoverPassword.js";

function Login() {
    const [email, setEmail] = useState("");

    const { recoverPassword, isLoading } = useRecoverPassword();

    async function handleLogin(e) {
        e.preventDefault();

        if (!email ) {
            return toast.error("All fields required");
        }

        recoverPassword({ email }, {
            onSettled: ()=>{
                setEmail("")
            }
        });
    }

    return (
        <section className="min-h-screen bg-white flex flex-col items-center justify-start py-4 px-6 gap-3">

            <h1 className="text-2xl font-semibold">Forgot password</h1>

            <div className="max-w-48">
                <img src={brokenVase} alt="table-product" className="w-full" />
            </div>

            <form onSubmit={handleLogin} className={`w-full max-w-sm flex flex-col gap-1`}>
            <h5 className=" text-lg capitalize">Enter your email and we'll send a link to reset your password</h5>
                <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" name="email" />

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? <Spinner className="size-5" /> : "reset password"}
                </Button>
            </form>
            <p className={`text-gray-500 text-sm`}>Remember your password? <Link className={`text-brand-main text-base font-medium hover:text-brand-main/90 transition-colors duration-300`} to={"/login"}> Back to login</Link></p>
        </section>
    );
}

export default Login;
