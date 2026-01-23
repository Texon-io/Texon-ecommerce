import { useState } from "react";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
} from "lucide-react";
import AddProductDialog from "./AddProductDialog";
import CustomSelect from "./CustomSelect";
import { Label } from "@/components/ui/label";
import ConfirmDeleteDialog from "@/components/ui/ConfirmDeleteDialog";
import { toast } from "sonner";
import AdminSidebar from "./AdminSidebar";
import AddPromoDialog from "./AddPromoDialog";
import { CategoryProgress, StatCard } from "./HelpsComponents";

const categories = [
  { id: "all", label: "All" },
  { id: "accessories", label: "Accessories" },
  { id: "bedroom", label: "Bedroom" },
  { id: "chairs", label: "Chairs" },
  { id: "kitchen", label: "Kitchen" },
  { id: "sitting_room", label: "Sitting Room" },
];

const statuses = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products"); // products | orders | promos
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatue, setSelectedStatue] = useState("all");
  const [productDeleteDialogOpen, setProductDeleteDialogOpen] = useState(false);
  const [promoDeleteDialogOpen, setPromoDeleteDialogOpen] = useState(false);
  const [isAddPromoOpen, setIsAddPromoOpen] = useState(false);
  const [promoSearch, setPromoSearch] = useState("");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-4 bg-gray-100 p-4">
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
            {/* Header: In the large screen, it's a row, in the small screen, it's a column */}
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

            {/* Filters & Search: Make it dynamic */}
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

              {/* Category Selector: Will take the all width on small screens */}
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

            {/* Products Table: Adding scrollbar in horizontal */}
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
                            onClick={() => setProductDeleteDialogOpen(true)}
                            className="w-full xl:w-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 shadow-sm rounded-lg transition-all cursor-pointer text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* TODO: Get the ID of the product to be deleted */}
                  <ConfirmDeleteDialog
                    title="Delete Product?"
                    description="Are you sure you want to delete this product?"
                    open={productDeleteDialogOpen}
                    onOpenChange={setProductDeleteDialogOpen}
                    onConfirm={() => {
                      console.log("Product deleted");
                      setProductDeleteDialogOpen(false);
                      toast.success("Product deleted successfully!");
                    }}
                  />
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
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
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
            />

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
                      Min Amount
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
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Welcome Header */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Dashboard Overview
              </h2>
              <p className="text-gray-500 text-sm">
                Welcome back! Here's what's happening with your store today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatCard
                title="Total Revenue"
                value="$12,845"
                icon={<DollarSign className="text-emerald-600" size={24} />}
                trend="+12.5%"
                trendUp={true}
                color="bg-emerald-50"
              />
              <StatCard
                title="Total Orders"
                value="456"
                icon={<ShoppingCart className="text-blue-600" size={24} />}
                trend="+5.2%"
                trendUp={true}
                color="bg-blue-50"
              />
              <StatCard
                title="Active Products"
                value="124"
                icon={<Package className="text-purple-600" size={24} />}
                trend="-2.1%"
                trendUp={false}
                color="bg-purple-50"
              />
              <StatCard
                title="Total Customers"
                value="1,120"
                icon={<Users className="text-amber-600" size={24} />}
                trend="+18%"
                trendUp={true}
                color="bg-amber-50"
              />
            </div>

            {/* Charts & Recent Activity Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Orders - Takes 2 columns on large screens */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-800 text-lg">
                    Recent Orders
                  </h3>
                  <button className="text-[#7C71DF] text-sm font-medium hover:underline cursor-pointer">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((order) => (
                    <div
                      key={order}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs">
                          #OR
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">
                            Ahmed Mohamed
                          </p>
                          <p className="text-xs text-gray-500">2 minutes ago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-brand-main">
                          $120.00
                        </p>
                        <span className="text-[10px] px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full font-medium">
                          Pending
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Categories - Takes 1 column */}
              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <h3 className="font-bold text-gray-800 text-lg mb-6">
                  Top Categories
                </h3>
                <div className="space-y-5">
                  <CategoryProgress
                    label="Bedroom"
                    percentage={75}
                    color="bg-purple-500"
                  />
                  <CategoryProgress
                    label="Kitchen"
                    percentage={50}
                    color="bg-blue-500"
                  />
                  <CategoryProgress
                    label="Accessories"
                    percentage={35}
                    color="bg-emerald-500"
                  />
                  <CategoryProgress
                    label="Chairs"
                    percentage={20}
                    color="bg-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
