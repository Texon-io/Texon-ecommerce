import {supabase} from "@/lib/Supabase.js";

export async function getUserOrders(userId) {
    const { data, error } = await supabase
        .from('orders')
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}