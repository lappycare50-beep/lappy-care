"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import AdminLayout from "@/components/admin/AdminLayout";
import CustomerProfile from "@/components/customers/CustomerProfile";

import { Customer } from "@/types/customer";

import {
  getCustomerById,
} from "@/services/customerService";

export default function CustomerProfilePage() {

  const params = useParams();

  const id = params.id as string;

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadCustomer() {

      try {

        const data =
          await getCustomerById(id);

        setCustomer(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    if (id) {
      loadCustomer();
    }

  }, [id]);

  if (loading) {

    return (

      <AdminLayout>

        <div className="p-10 text-white">

          Loading Customer...

        </div>

      </AdminLayout>

    );

  }

  if (!customer) {

    return (

      <AdminLayout>

        <div className="p-10 text-red-400">

          Customer Not Found

        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <CustomerProfile
        customer={customer}
      />

    </AdminLayout>

  );

}