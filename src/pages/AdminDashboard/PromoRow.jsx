import ConfirmDeleteDialog from "@/components/ui/ConfirmDeleteDialog";
import { Trash2 } from "lucide-react";
import { Edit } from "lucide-react";
import { useState } from "react";
import { usePromos } from "./usePromos";

function PromoRow({ promo, onEdit }) {
  const [promoDeleteDialogOpen, setPromoDeleteDialogOpen] = useState(false);
  const { deletePromo } = usePromos();

  const {
    id,
    code,
    discount_percentage: discount,
    min_order_amount: minPurchase,
    usage_count: usageCount,
    is_active: status,
  } = promo;

  //   console.log(code, discount, minPurchase, usageCount, status);

  return (
    <tr className="hover:bg-gray-50/50 transition">
      <td className="p-4">
        <span className="font-mono font-bold text-lg bg-gray-100 px-3 py-1 rounded-md border border-dashed border-gray-300 text-gray-800">
          {code}
        </span>
      </td>
      <td className="p-4">
        <span className="text-green-600 font-bold">{discount}% OFF</span>
      </td>
      <td className="p-4">
        <span className=" font-bold">{minPurchase}$</span>
      </td>

      <td className="p-4 text-gray-600 text-sm">{usageCount}</td>
      <td className="p-4">
        <span
          className={`  px-3 py-1 ${status ? "bg-green-200 text-green-700" : "bg-red-200 text-red-600"} rounded-full text-[10px] font-bold uppercase whitespace-nowrap`}
        >
          {status ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="p-4">
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => onEdit(promo)}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="Delete"
            onClick={() => setPromoDeleteDialogOpen(true)}
          >
            <Trash2 size={18} />
          </button>
          <ConfirmDeleteDialog
            title="Delete Promo?"
            description="Are you sure you want to delete this Promo?"
            open={promoDeleteDialogOpen}
            onOpenChange={setPromoDeleteDialogOpen}
            onConfirm={() => {
              deletePromo(id);
              setPromoDeleteDialogOpen(false);
            }}
          />
        </div>
      </td>
    </tr>
  );
}

export default PromoRow;
