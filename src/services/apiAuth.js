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

export async function getUserData() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
}

export async function logOut(){
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Error logging out:", error.message);
}

export async function updateUserData({ newPassword, fullName }) {
    let submittedData = {};
    if (newPassword) submittedData.password = newPassword;
    if (fullName) submittedData.data = { full_name: fullName };

    const { data, error } = await supabase.auth.updateUser(submittedData);
    if (error) throw error;
    return data;
}