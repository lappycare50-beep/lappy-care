import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getDashboardStats() {
  const snapshot = await getDocs(collection(db, "products"));

  const products = snapshot.docs.map((doc) => doc.data());

  const totalProducts = products.length;

  const inStock = products.filter((p) => p.stock).length;

  const outOfStock = totalProducts - inStock;

  const inventoryValue = products.reduce(
    (sum, p) => sum + Number(p.price || 0),
    0
  );

  return {
    totalProducts,
    inStock,
    outOfStock,
    inventoryValue,
    recentProducts: products.slice(0, 5),
  };
}