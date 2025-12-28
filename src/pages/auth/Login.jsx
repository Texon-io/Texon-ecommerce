import { toast } from "sonner";
import { useState } from "react";
import {useLogin} from "@/pages/auth/useLogin.js";
import {Link} from "react-router-dom";

import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import { Spinner } from "@/components/ui/spinner.jsx";
import {categ02} from "@/utils/constants.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isLoading } = useLogin();

    async function handleLogin(e) {
        e.preventDefault();

        if (!email || !password) {
            return toast.error("All fields required");
        }

        login({ email, password }, {
            onSettled: ()=>{
                setEmail("")
                setPassword("");
            }
        });
    }

    return (
        <section className="min-h-screen bg-white flex flex-col items-center justify-start py-4 px-6 gap-3">

            <h1 className="text-2xl font-semibold">Login</h1>

            <div className="max-w-48">
                <img src={categ02} alt="table-product" className="w-full" />
            </div>
            <h5 className="font-medium text-xl capitalize">Welcome Back !</h5>

            <form onSubmit={handleLogin} className={`w-full max-w-sm flex flex-col gap-1`}>
                <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" name="email" />
                <Input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" name="password" />

                <Link to={'/forget'} className={`text-brand-main mb-4 text-end cursor-pointer text-base font-medium hover:text-brand-main/90 transition-colors duration-300`}>Forgot Password?</Link>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? <Spinner className="size-5" /> : "Login"}
                </Button>
            </form>
            <p className={`text-gray-500 text-sm`}>First time here? <Link className={`text-brand-main text-base font-medium hover:text-brand-main/90 transition-colors duration-300`} to={"/register"}> Create an account</Link></p>
        </section>
    );
}

export default Login;
