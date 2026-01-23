import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AddPromoDialog({ open, onOpenChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    value: "",
    usageLimit: "",
    minimumOrderAmount: "",
    isActive: false,
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Send the form data to your server
      console.log("Promo Data:", formData);

      toast.success("Promo code created successfully!");
      onOpenChange(false); // Close the dialog
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Create Promo Code
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Code Name */}
            <div className="space-y-2">
              <Label htmlFor="code">Promo Code</Label>
              <input
                id="code"
                placeholder="e.g. SUMMER2024"
                className="w-full p-2 border rounded-lg outline-none focus:ring-2 ring-[#7C71DF]/20 uppercase"
                required
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
              />
            </div>
            {/* Discount Value */}
            <div className="space-y-2 ">
              <Label htmlFor="value">Value</Label>
              <input
                id="value"
                type="number"
                placeholder={formData.type === "percent" ? "%" : "$"}
                className="w-full p-2 border rounded-lg outline-none focus:ring-2 ring-[#7C71DF]/20"
                required
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            {/* Min Amount */}
            <div className="space-y-2">
              <Label htmlFor="min-amount">Min Amount</Label>
              <input
                id="min-amount"
                type="number"
                placeholder="200$"
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

            {/* Usage Limit */}
            <div className="space-y-2">
              <Label htmlFor="limit">Usage Limit</Label>
              <input
                id="limit"
                type="number"
                placeholder="e.g. 100"
                className="w-full p-2 border rounded-lg outline-none focus:ring-2 ring-[#7C71DF]/20"
                required
                value={formData.usageLimit}
                onChange={(e) =>
                  setFormData({ ...formData, usageLimit: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Status */}
            <div className="flex items-center gap-4">
              <input
                id="statue"
                type="checkbox"
                className="w-5 h-5 "
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
              />
              <Label htmlFor="statue">Is Active</Label>
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
              disabled={isLoading}
              className="cursor-pointer bg-[#7C71DF] text-white px-6 py-2 rounded-lg hover:bg-[#6b61c5] transition-all disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Create Coupon"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
