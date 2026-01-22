import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  TicketPercent,
  ShoppingCart,
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
} from "lucide-react";
import AddProductDialog from "./AddProductDialog";
import CustomSelect from "./CustomSelect";
import { Label } from "@/components/ui/label";
import ConfirmDeleteDialog from "@/components/ui/ConfirmDeleteDialog";
import { toast } from "sonner";
import AdminSidebar from "./AdminSidebar";

const categories = [
  { id: "all", label: "All" },
  { id: "accessories", label: "Accessories" },
  { id: "bedroom", label: "Bedroom" },
  { id: "chairs", label: "Chairs" },
  { id: "kitchen", label: "Kitchen" },
  { id: "sitting_room", label: "Sitting Room" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products"); // products | orders | promos
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isAddPromoOpen, setIsAddPromoOpen] = useState(false);
  const [promoSearch, setPromoSearch] = useState("");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-4 bg-gray-100 p-4">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-white border-r p-6 space-y-8">
        <h1 className="text-2xl font-bold text-brand-main">Admin Panel</h1>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${activeTab === "stats" ? "bg-brand-main text-white" : "hover:bg-gray-100"}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${activeTab === "products" ? "bg-brand-main text-white" : "hover:bg-gray-100"}`}
          >
            <Package size={20} /> Products
          </button>
          <button
            onClick={() => setActiveTab("promos")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${activeTab === "promos" ? "bg-brand-main text-white" : "hover:bg-gray-100"}`}
          >
            <TicketPercent size={20} /> Promo Codes
          </button>
        </nav>
      </aside> */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {addProductDialogOpen && (
        <AddProductDialog
          open={addProductDialogOpen}
          setOpen={setAddProductDialogOpen}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 w-full rounded-xl shadow-lg border mx-auto bg-gray-200 mt-4 lg:mt-0">
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Header: تحويل لعمود في الموبايل */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Products
              </h2>
              <button
                onClick={() => setAddProductDialogOpen(true)}
                className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <PlusCircle size={20} /> Add Product
              </button>
            </div>

            {/* Filters & Search: جعلها مرنة وتتحول لصفوف في الشاشات الصغيرة */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border shadow-sm">
              <div className="flex-1 space-y-2 text-left">
                <Label
                  htmlFor="search"
                  className="text-sm font-medium text-brand-main2"
                >
                  Search
                </Label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={18}
                  />
                  <input
                    id="search"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2.5 border rounded-lg w-full outline-none focus:ring-2 ring-brand-main-trans shadow-sm text-sm"
                  />
                </div>
              </div>

              {/* Category Selector: سياخذ العرض كاملا في الموبايل */}
              <div className="w-full space-y-2 md:w-auto">
                <Label
                  htmlFor="category"
                  className="text-sm font-medium text-brand-main2"
                >
                  Category
                </Label>
                <CustomSelect
                  id={`category`}
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  options={categories}
                  placeholder="Filter by Category"
                />
              </div>
            </div>

            {/* Products Table: إضافة overflow-x-auto لضمان التمرير الجانبي في الموبايل */}
            <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-gray-50 border-b">
                  <tr className="divide-x text-center">
                    <th className="p-4 font-semibold text-gray-600 text-sm">
                      Product
                    </th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">
                      Category
                    </th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">
                      Price
                    </th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">
                      Stock
                    </th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition text-center divide-x"
                    >
                      <td className="p-4 flex items-center gap-3 min-w-[200px]">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-lg flex-shrink-0" />
                        <span className="font-medium text-gray-800 text-sm truncate">
                          Modern Sofa
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 text-sm">Furniture</td>
                      <td className="p-4 font-bold text-brand-main text-sm">
                        $450
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] lg:text-xs whitespace-nowrap">
                          15 in stock
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col xl:flex-row gap-2 justify-center items-center">
                          <button className="w-full xl:w-auto bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 shadow-sm rounded-lg transition-all cursor-pointer text-xs">
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteDialogOpen(true)}
                            className="w-full xl:w-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 shadow-sm rounded-lg transition-all cursor-pointer text-xs"
                          >
                            Delete
                          </button>
                          <ConfirmDeleteDialog
                            open={deleteDialogOpen}
                            onOpenChange={setDeleteDialogOpen}
                            onConfirm={() => {
                              console.log("Product deleted");
                              setDeleteDialogOpen(false);
                              toast.success("Product deleted successfully!");
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "promos" && (
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
                onClick={() => setIsAddPromoOpen(true)}
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
                  <Search
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={18}
                  />
                  <input
                    id="promo-search"
                    placeholder="Search by code (e.g. SUMMER24)..."
                    value={promoSearch}
                    onChange={(e) => setPromoSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-full outline-none focus:ring-2 ring-[#7C71DF]/20 shadow-sm text-sm"
                  />
                </div>
              </div>
              {/* TODO: Replace with Custom Select Component */}
              <select className="w-full md:w-48 border rounded-lg px-3 py-2 text-sm bg-gray-50 outline-none focus:border-[#7C71DF]">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            {/* Promo Codes Table */}
            <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-center">
                    <th className="p-4 font-semibold text-gray-600 text-sm">
                      Code
                    </th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">
                      Discount
                    </th>

                    <th className="p-4 font-semibold text-gray-600 text-sm">
                      Usage Limit
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
                  <tr className="hover:bg-gray-50/50 transition">
                    <td className="p-4">
                      <span className="font-mono font-bold text-lg bg-gray-100 px-3 py-1 rounded-md border border-dashed border-gray-300 text-gray-800">
                        TEXON20
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-green-600 font-bold">20% OFF</span>
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
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
