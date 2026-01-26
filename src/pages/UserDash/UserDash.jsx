import React, { useState } from "react";
import AccountSettings from "./AccountSettings.jsx";
import OrdersTable from "./OrdersTable.jsx";
import Button from "@/components/ui/Button.jsx";
import { useLogout } from "@/pages/auth/useLogout.js";
import { LogOutIcon, PackageIcon, User2Icon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner.jsx";

const UserDash = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { logout, isPending } = useLogout();

  return (
    <div className="min-h-screen bg-zinc-50 rounded-xl p-4 md:p-8 mt-8">
      <div className=" mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-brand-black">
            Update your account
          </h1>
        </header>

        <div className="flex flex-col md:flex-row gap-8 sticky top-0">
          <nav className="w-full md:w-64 space-y-4 md:sticky md:top-24 h-fit">
            {" "}
            <Button
              className={`w-full`}
              onClick={() => setActiveTab("profile")}
              variant={`${activeTab === "profile" ? "main" : "secondary"}`}
            >
              Account Details{" "}
              <span>
                <User2Icon />
              </span>
            </Button>
            <Button
              className={`w-full`}
              onClick={() => setActiveTab("orders")}
              variant={`${activeTab === "orders" ? "main" : "secondary"}`}
            >
              Previous Orders{" "}
              <span>
                <PackageIcon strokeWidth={1.4} />
              </span>
            </Button>
            <Button
              className="w-full transition-colors duration-500"
              onClick={logout}
              variant="outline"
            >
              Logout{" "}
              <span>
                {isPending ? (
                  <Spinner className={`size-5`} />
                ) : (
                  <LogOutIcon size={16} />
                )}
              </span>
            </Button>
          </nav>

          <main className="flex-1">
            {activeTab === "profile" ? <AccountSettings /> : <OrdersTable />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserDash;
