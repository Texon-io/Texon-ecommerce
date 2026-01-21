import { supabase } from "@/lib/Supabase.js";
export async function getProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*") // Select all columns
    .eq("id", id) // Filter by id
    .single(); // To get a single record

  if (error) {
    console.error(error);
    throw new Error("Product could not be loaded");
  }

  return data;
}
