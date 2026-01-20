// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {supabase} from "@/lib/Supabase.js";
import {Spinner} from "@/components/ui/spinner.jsx";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const session = supabase.auth.getSession();
        session.then(({ data }) => {
            if (!data?.session?.user) {
                navigate("/login");
            } else {
                setUser(data.session.user);
            }
            setLoading(false);
        });
    }, [navigate]);

    if (loading)  return <div className="flex justify-center p-10"><Spinner className={`size-10`}/></div>;;
    if (!user) return null;

    return children;
}
