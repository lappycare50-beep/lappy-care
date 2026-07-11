import {
  Laptop,
  ShoppingCart,
  Users,
  Wrench,
} from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";

export default function DashboardPage() {
  return (
    <AdminLayout>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-6">
          <Laptop className="text-yellow-400" size={42} />
          <p className="mt-6 text-gray-400">
            Total Products
          </p>
          <h3 className="mt-2 text-4xl font-bold text-white">
            12
          </h3>
        </div>

        <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-6">
          <Wrench className="text-yellow-400" size={42} />
          <p className="mt-6 text-gray-400">
            Repair Bookings
          </p>
          <h3 className="mt-2 text-4xl font-bold text-white">
            28
          </h3>
        </div>

        <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-6">
          <ShoppingCart className="text-yellow-400" size={42} />
          <p className="mt-6 text-gray-400">
            Laptop Orders
          </p>
          <h3 className="mt-2 text-4xl font-bold text-white">
            9
          </h3>
        </div>

        <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-6">
          <Users className="text-yellow-400" size={42} />
          <p className="mt-6 text-gray-400">
            Customers
          </p>
          <h3 className="mt-2 text-4xl font-bold text-white">
            164
          </h3>
        </div>

      </div>

    </AdminLayout>
  );
}