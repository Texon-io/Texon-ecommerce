import {supabase} from "@/lib/Supabase.js";
import {toast} from "sonner";

export async function getProducts(){
    let { data, error } = await supabase
        .from('products')
        .select('*')

    if (error){
        console.error(error.message)
        toast.error(error.message)
    } else{
        return data
    }


}