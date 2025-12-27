import {supabase} from "@/lib/Supabase.js";

export async function signUp({email, password}) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error(error.message)
        throw error
    } else {
        return data
    };
}

export async function login({email, password}){
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        console.error(error.message)
        throw error
    } else {
        return data
    };
}

export async function forgetPassword({email}){

    let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });


    if (error) {
        console.error(error.message)
        throw error
    } else {
        return data
    };
}

