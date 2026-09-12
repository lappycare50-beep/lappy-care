import { getProducts } from "@/services/productService";
import { Product } from "@/types/product";

export type DashboardStats = {
  totalProducts: number;
  inStock: number;
  outOfStock: number;
  inventoryValue: number;
  recentProducts: Product[];
};

// =====================================================
// Dashboard Statistics
// =====================================================

export async function getDashboardStats(): Promise<DashboardStats> {
  const products = await getProducts();

  const totalProducts =
    products.length;

  const inStock =
    products.filter(
      (product) =>
        Boolean(product.stock)
    ).length;

  const outOfStock =
    totalProducts -
    inStock;

  const inventoryValue =
    products.reduce(
      (sum, product) =>
        sum +
        Number(product.price || 0),
      0
    );

  const recentProducts =
    products
      .slice(-5)
      .reverse();

  return {
    totalProducts,
    inStock,
    outOfStock,
    inventoryValue,
    recentProducts,
  };
}
