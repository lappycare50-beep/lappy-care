import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Product } from "@/types/product";

const productsCollection = collection(db, "products");

// Get All Products
export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(productsCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  }));
}

// Add Product
export async function addProduct(product: Omit<Product, "id">) {
  return await addDoc(productsCollection, product);
}

// Update Product
export async function updateProduct(
  id: string,
  product: Partial<Product>
) {
  const productRef = doc(db, "products", id);

  return await updateDoc(productRef, product);
}

// Delete Product
export async function deleteProduct(id: string) {
  const productRef = doc(db, "products", id);

  return await deleteDoc(productRef);
}