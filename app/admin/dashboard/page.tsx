"use client";

import { useEffect, useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import RecentProducts from "@/components/admin/RecentProducts";

import { getDashboardStats } from "@/services/dashboardService";

type Stats = {
  totalProducts: number;
  inStock: number;
  outOfStock: number;
  inventoryValue: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    inStock: 0,
    outOfStock: 0,
    inventoryValue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();

        setStats({
          totalProducts: data.totalProducts,
          inStock: data.inStock,
          outOfStock: data.outOfStock,
          inventoryValue: data.inventoryValue,
        });
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-400">
          Welcome to Lappy Care ERP
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-[#181818] p-10 text-center text-white">
          Loading Dashboard...
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Total Products"
              value={stats.totalProducts}
            />

            <StatCard
              title="Inventory Value"
              value={`₹${stats.inventoryValue.toLocaleString("en-IN")}`}
            />

            <StatCard
              title="In Stock"
              value={stats.inStock}
              color="text-green-400"
            />

            <StatCard
              title="Out Of Stock"
              value={stats.outOfStock}
              color="text-red-400"
            />

          </div>

          {/* Recent Products */}
          <RecentProducts />
        </>
      )}
    </AdminLayout>
  );
}