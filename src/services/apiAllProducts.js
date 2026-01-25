import { supabase } from "@/lib/Supabase.js";

// Get products
export async function getAllProducts({ category = "All" }) {
  let query = supabase.from("products").select("*");
  if (category && category !== "All") {
    query = query.eq("category", category);
  }
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data; // Return the data
}

// Add product
export async function addProduct(newProduct) {
  const imageFile = newProduct.image_url;
  let publicImageUrl = "";

  if (imageFile && typeof imageFile !== "string") {
    // Setup for unique name for the image
    const imageName = `${Math.random()}-${imageFile.name}`.replace(/\//g, "");
    const imagePath = `${imageName}`;

    // Upload to storage process
    const { error: storageError } = await supabase.storage
      .from("product-images") // Bucket name
      .upload(imagePath, imageFile);

    if (storageError) {
      console.error("Storage Error:", storageError);
      throw new Error("حدث خطأ أثناء رفع الصورة، لم يتم إضافة المنتج.");
    }

    // الحصول على الرابط المباشر للصورة بعد الرفع
    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(imagePath);

    publicImageUrl = urlData.publicUrl;
  } else {
    // لو مفيش صورة أو مبعوت رابط جاهز (string)
    publicImageUrl = typeof imageFile === "string" ? imageFile : "";
  }

  // 3. تجهيز الـ Object النهائي اللي هينزل في الـ Table
  const finalProductData = {
    title: newProduct.title,
    description: newProduct.description,
    category: newProduct.category,
    price: Number(newProduct.price), // تأكد إن السعر رقم
    stock: Number(newProduct.stock), // تأكد إن المخزون رقم
    discount: Number(newProduct.discount || 0),
    image_url: publicImageUrl, // الرابط اللي جالنا من الـ Storage
  };

  // 4. إضافة البيانات لجدول المنتجات
  const { data, error } = await supabase
    .from("products")
    .insert([finalProductData])
    .select()
    .single(); // عشان يرجع لي المنتج اللي اتضاف كـ Object مش Array

  if (error) {
    console.error("Database Error:", error);
    throw new Error(error.message);
  }

  return data;
}

// Delete product
export async function deleteProduct(id) {
  // 1. أولاً: نجيب بيانات المنتج عشان نعرف مسار الصورة
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("image_url")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error("لم يتم العثور على المنتج لمسحه");

  // 2. ثانياً: لو فيه صورة، نمسحها من الـ Storage
  if (product.image_url) {
    // بنستخرج اسم الملف من الرابط (آخر جزء في الـ URL)
    const imageName = product.image_url.split("/").pop();

    const { error: storageError } = await supabase.storage
      .from("product-images") // تأكد من اسم الـ Bucket عندك
      .remove([imageName]);

    if (storageError) {
      console.error("فشل مسح الصورة من الـ Storage:", storageError);
      // بنكمل مسح المنتج حتى لو الصورة فشلت عشان ميفضلش المنتج متعلق
    }
  }

  // 3. ثالثاً: نمسح المنتج نفسه من الجدول
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

// Edit product
export async function editProduct({ id, updatedData }) {
  let imageUrl = updatedData.image_url;

  // 1. فحص إذا كان المستخدم رفع ملف جديد (File) وليس مجرد رابط (String)
  const isNewSessionImage = updatedData.image_url instanceof File;

  if (isNewSessionImage) {
    // أ- هات بيانات المنتج القديم عشان نعرف رابط الصورة القديمة ونمسحها
    const { data: oldProduct } = await supabase
      .from("products")
      .select("image_url")
      .eq("id", id)
      .single();

    // ب- ارفع الصورة الجديدة
    const imageName =
      `${Math.random()}-${updatedData.image_url.name}`.replaceAll("/", "");
    const imagePath = imageName;

    const { error: storageError } = await supabase.storage
      .from("product-images")
      .upload(imagePath, updatedData.image_url);

    if (storageError) throw new Error("فشل رفع الصورة الجديدة");

    // ج- احصل على الرابط الجديد
    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(imagePath);

    imageUrl = urlData.publicUrl;

    // د- (اختياري ولكن محبذ) امسح الصورة القديمة من الـ Storage
    if (oldProduct?.image_url) {
      const oldImageName = oldProduct.image_url.split("/").pop();
      await supabase.storage.from("product-images").remove([oldImageName]);
    }
  }

  // 2. تحديث بيانات الجدول بالبيانات الجديدة (سواء الرابط اتغير أو لأ)
  const finalUpdate = {
    ...updatedData,
    image_url: imageUrl,
    // تأكد من تحويل القيم لأرقام لتجنب مشاكل النوع (Types)
    price: Number(updatedData.price),
    stock: Number(updatedData.stock),
  };

  const { data, error } = await supabase
    .from("products")
    .update(finalUpdate)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
