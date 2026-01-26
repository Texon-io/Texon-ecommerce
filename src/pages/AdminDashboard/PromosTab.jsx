import CustomSelect from "./CustomSelect";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Search, PlusCircle } from "lucide-react";
import AddPromoDialog from "./AddPromoDialog";
import PromoRow from "./PromoRow";
import { usePromos } from "./usePromos";

const statuses = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
];

function PromosTab() {
  const [selectedStatue, setSelectedStatue] = useState("all");
  const [isAddPromoOpen, setIsAddPromoOpen] = useState(false);
  const [promoSearch, setPromoSearch] = useState("");
  const [selectedPromo, setSelectedPromo] = useState(null);

  function handleEdit(promo) {
    setSelectedPromo(promo);
    setIsAddPromoOpen(true);
  }

  function handleAddNew() {
    setSelectedPromo(null);
    setIsAddPromoOpen(true);
  }
  const { promos } = usePromos();

  const displayedPromos = promos.filter((promo) => {
    const matchesStatus =
      selectedStatue === "all" ||
      (selectedStatue === "active" && promo.is_active) ||
      (selectedStatue === "inactive" && !promo.is_active);

    const matchesSearch = promo.code
      .toLowerCase()
      .includes(promoSearch.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  console.log(promos, displayedPromos);
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Promo Codes
          </h2>
          <p className="text-gray-500 text-sm">
            Create and manage discount coupons for your store
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 bg-[#7C71DF] text-white px-5 py-2.5 rounded-xl hover:bg-[#6b61c5] transition-all shadow-md shadow-[#7C71DF]/20"
        >
          <PlusCircle size={20} /> Create New Coupon
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full space-y-2 text-left">
          <Label
            htmlFor="promo-search"
            className="text-sm font-medium text-gray-700"
          >
            Search Codes
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              id="promo-search"
              placeholder="Search by code (e.g. SUMMER24)..."
              value={promoSearch}
              onChange={(e) => setPromoSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 border rounded-lg w-full outline-none focus:ring-2 ring-[#7C71DF]/20 shadow-sm text-sm"
            />
          </div>
        </div>

        <CustomSelect
          options={statuses}
          id={`promo-statue`}
          label="Status"
          value={selectedStatue}
          onValueChange={setSelectedStatue}
        />
      </div>

      <AddPromoDialog
        open={isAddPromoOpen}
        onOpenChange={setIsAddPromoOpen}
        promoToEdit={selectedPromo}
      />

      {/* Promo Codes Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="bg-gray-50 border-b">
            <tr className="text-center">
              <th className="p-4 font-semibold text-gray-600 text-sm">Code</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">
                Discount
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm">
                Min Amount
              </th>

              <th className="p-4 font-semibold text-gray-600 text-sm">
                Usage Count
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm">
                Status
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y text-center">
            {/* Example */}
            {displayedPromos.map((promo) => (
              <PromoRow key={promo.id} promo={promo} onEdit={handleEdit} />
            ))}
            {/* <tr className="hover:bg-gray-50/50 transition">
              <td className="p-4">
                <span className="font-mono font-bold text-lg bg-gray-100 px-3 py-1 rounded-md border border-dashed border-gray-300 text-gray-800">
                  TEXON20
                </span>
              </td>
              <td className="p-4">
                <span className="text-green-600 font-bold">20% OFF</span>
              </td>
              <td className="p-4">
                <span className=" font-bold">300$</span>
              </td>

              <td className="p-4 text-gray-600 text-sm">45 / 100</td>
              <td className="p-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">
                  Active
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-2 justify-center">
                  <button
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
                      console.log("PROMO deleted");
                      setPromoDeleteDialogOpen(false);
                      toast.success("PROMOCODE deleted successfully!");
                    }}
                  />
                </div>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PromosTab;
