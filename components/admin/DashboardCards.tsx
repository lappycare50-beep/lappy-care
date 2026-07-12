"use client";

import {
  Laptop,
  PackageCheck,
  PackageX,
} from "lucide-react";

import { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export default function DashboardCards({
  products,
}: Props) {
  const total = products.length;

  const inStock = products.filter(
    (p) => p.stock
  ).length;

  const outStock = total - inStock;

  const cards = [
    {
      title: "Total Products",
      value: total,
      icon: Laptop,
      color: "text-yellow-400",
    },
    {
      title: "In Stock",
      value: inStock,
      icon: PackageCheck,
      color: "text-green-400",
    },
    {
      title: "Out Of Stock",
      value: outStock,
      icon: PackageX,
      color: "text-red-400",
    },
  ];

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">
                  {card.title}
                </p>

                <h2
                  className={`mt-2 text-4xl font-bold ${card.color}`}
                >
                  {card.value}
                </h2>
              </div>

              <Icon
                size={42}
                className={card.color}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}