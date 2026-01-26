import { supabase } from "@/lib/Supabase.js";

// Get Promos
export async function getPromos() {
  const { data, error } = await supabase
    .from("promocodes")
    .select("*")
    .order("is_active", { ascending: false }); // Order by newest first

  if (error) {
    console.error(error);
    throw new Error("Could not load promocodes");
  }
  return data;
}

// 1. Add new promo
export async function addPromo(newPromo) {
  const { data, error } = await supabase
    .from("promocodes")
    .insert([newPromo])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// 2. Edit promo
export async function editPromo({ id, updatedData }) {
  const { data, error } = await supabase
    .from("promocodes")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// 3. Delete promo
export async function deletePromo(id) {
  const { error } = await supabase.from("promocodes").delete().eq("id", id);

  if (error) throw new Error(error.message);
}
