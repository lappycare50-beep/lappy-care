import Image from "next/image";

import {
  Product,
} from "@/types/product";

type Props = {
  products: Product[];
};

export default function RecentProducts({
  products,
}: Props) {
  return (
    <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Recent Products
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700 text-left text-gray-400">
              <th className="pb-4">Image</th>
              <th className="pb-4">Brand</th>
              <th className="pb-4">Model</th>
              <th className="pb-4">Price</th>
              <th className="pb-4">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map(
              (product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-800"
                >
                  <td className="py-4">
                    <Image
                      src={product.image}
                      alt={product.model}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                  </td>

                  <td className="text-white">
                    {product.brand}
                  </td>

                  <td className="text-gray-300">
                    {product.model}
                  </td>

                  <td className="font-semibold text-yellow-400">
                    ₹
                    {product.price.toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td>
                    {product.stock ? (
                      <span className="rounded bg-green-600 px-3 py-1 text-sm text-white">
                        In Stock
                      </span>
                    ) : (
                      <span className="rounded bg-red-600 px-3 py-1 text-sm text-white">
                        Out
                      </span>
                    )}
                  </td>
                </tr>
              )
            )}

            {products.length ===
              0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-sm text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
