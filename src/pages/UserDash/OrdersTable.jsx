import {Spinner} from "@/components/ui/spinner.jsx";
import {useUserOrders} from "@/pages/UserDash/useUserOrders.js";
import {useUser} from "@/pages/UserDash/useUser.js";


const OrdersTable = () => {
    const{user} = useUser()
    console.log(user)

    const { orders, isLoading, isError } = useUserOrders(user?.id)

    if (isLoading || !user) return <div className="flex justify-center p-10"><Spinner className={`size-10`}/></div>;
    if (isError) return <div className="text-red-500 text-center p-10">Error loading orders!</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50">
                <h2 className="text-xl font-bold text-brand-black">My Orders</h2>
            </div>
            <hr/>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 text-brand-black text-sm font-bold uppercase">
                    <tr>
                        <th className="px-6 py-4 font-semibold">ID</th>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Total</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-brand-black">
                    {orders?.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-100 font-semibold transition-colors text-center duration-200">
                            <td className="px-6 py-4 text-sm">
                                #{order.id.slice(0, 8)}...
                            </td>
                            <td className="px-6 py-4 ">
                                {new Date(order.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 ">${order.total_price}</td>
                            <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                        order.status === 'Delivered' ? 'bg-green-100 ' : 'bg-amber-200 '
                    }`}>
                      {order.status}
                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default  OrdersTable;