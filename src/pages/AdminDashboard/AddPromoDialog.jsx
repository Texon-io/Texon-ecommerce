import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { usePromos } from "./usePromos";

export default function AddPromoDialog({
  open,
  onOpenChange,
  promoToEdit = null,
}) {
  const { addPromo, editPromo, isWorking } = usePromos();

  const [formData, setFormData] = useState({
    code: "",
    value: "",
    minimumOrderAmount: "",
    isActive: false,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (promoToEdit) {
      setFormData({
        code: promoToEdit.code || "",
        value: promoToEdit.discount_percentage || "",
        minimumOrderAmount: promoToEdit.min_order_amount || "",
        isActive: promoToEdit.is_active || false,
      });
    } else {
      setFormData({
        code: "",
        value: "",
        minimumOrderAmount: "",
        isActive: false,
      });
    }
  }, [promoToEdit, open]);

  const handleSave = async (e) => {
    e.preventDefault();

    // تجهيز البيانات بالأسماء الصحيحة لـ Supabase فقط
    const promoData = {
      code: formData.code.toUpperCase(),
      discount_percentage: Number(formData.value),
      min_order_amount: Number(formData.minimumOrderAmount),
      is_active: formData.isActive,
    };

    if (promoToEdit) {
      editPromo(
        { id: promoToEdit.id, updatedData: promoData },
        { onSuccess: () => onOpenChange(false) },
      );
    } else {
      addPromo(promoData, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {promoToEdit ? "Edit Promo Code" : "Create Promo Code"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Promo Code</Label>
              <input
                id="code"
                placeholder="e.g. SUMMER20"
                className="w-full p-2 border rounded-lg outline-none focus:ring-2 ring-[#7C71DF]/20 uppercase"
                required
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Discount %</Label>
              <input
                id="value"
                type="number"
                placeholder="20"
                className="w-full p-2 border rounded-lg outline-none focus:ring-2 ring-[#7C71DF]/20"
                required
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min-amount">Min Order ($)</Label>
              <input
                id="min-amount"
                type="number"
                placeholder="200"
                className="w-full p-2 border rounded-lg outline-none focus:ring-2 ring-[#7C71DF]/20"
                required
                value={formData.minimumOrderAmount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minimumOrderAmount: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex items-center gap-2 pt-8 ">
              <input
                id="isActive"
                type="checkbox"
                className="w-5 h-5 accent-[#7C71DF] cursor-pointer"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                Active
              </Label>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isWorking}
              className="cursor-pointer bg-[#7C71DF] text-white px-6 py-2 rounded-lg hover:bg-[#6b61c5] transition-all disabled:opacity-50"
            >
              {isWorking ? "Saving..." : promoToEdit ? "Update" : "Create"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
