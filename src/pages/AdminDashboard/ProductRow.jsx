import { toast } from "sonner";
import { useAllProducts } from "./useAllProducts";
import { useState } from "react";
import ConfirmDeleteDialog from "@/components/ui/ConfirmDeleteDialog";
import AddProductDialog from "./AddProductDialog"; // استيراد الموديل اللي جهزناه

function ProductRow({ product }) {
  const [productDeleteDialogOpen, setProductDeleteDialogOpen] = useState(false);
  const [productEditDialogOpen, setProductEditDialogOpen] = useState(false); // State للتعديل

  const { deleteProduct } = useAllProducts();
  const { title, image_url, category, price, stock } = product;

  return (
    <tr
      key={product.id}
      className="hover:bg-gray-50 transition text-center divide-x"
    >
      <td className="p-4 flex items-center gap-3 min-w-[200px]">
        <img
          src={image_url}
          alt={title}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex-shrink-0"
        />
        <span className="font-medium text-gray-800 text-sm truncate">
          {title}
        </span>
      </td>

      {/* ... بقية الـ cells ... */}
      <td className="p-4 text-gray-600 text-sm">{category}</td>
      <td className="p-4 font-bold text-brand-main text-sm">${price}</td>
      <td className="p-4">
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] lg:text-xs whitespace-nowrap">
          {stock > 0 ? `${stock} In Stock` : "Out of Stock"}
        </span>
      </td>

      <td className="p-4 text-center">
        <div className="flex flex-col xl:flex-row gap-2 justify-center items-center">
          {/* زرار التعديل */}
          <button
            onClick={() => setProductEditDialogOpen(true)} // افتح موديل التعديل
            className="w-full xl:w-auto bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 shadow-sm rounded-lg transition-all cursor-pointer text-xs"
          >
            Edit
          </button>

          {/* زرار الحذف */}
          <button
            onClick={() => setProductDeleteDialogOpen(true)}
            className="w-full xl:w-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 shadow-sm rounded-lg transition-all cursor-pointer text-xs"
          >
            Delete
          </button>

          {/* موديل التعديل - بنبعت له البيانات الحالية */}
          <AddProductDialog
            open={productEditDialogOpen}
            setOpen={setProductEditDialogOpen}
            productToEdit={product} // السحر هنا!
          />

          {/* موديل الحذف */}
          <ConfirmDeleteDialog
            title="Delete Product?"
            description="Are you sure you want to delete this product?"
            open={productDeleteDialogOpen}
            onOpenChange={setProductDeleteDialogOpen}
            onConfirm={() => {
              deleteProduct(product.id);
              setProductDeleteDialogOpen(false);
              toast.success("Product deleted successfully!");
            }}
          />
        </div>
      </td>
    </tr>
  );
}

export default ProductRow;
