import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Product } from "@/types/product";

const productsCollection =
  collection(db, "products");

// =====================================================
// CACHE
// =====================================================

let productsCache: Product[] | null = null;
let productsCacheTime = 0;

const PRODUCTS_CACHE_TTL = 60 * 1000;

function invalidateProductsCache() {
  productsCache = null;
  productsCacheTime = 0;
}

// =====================================================
// Get All Products
// =====================================================

export async function getProducts(
  forceRefresh = false
): Promise<Product[]> {
  const now = Date.now();

  if (
    !forceRefresh &&
    productsCache &&
    now - productsCacheTime <
      PRODUCTS_CACHE_TTL
  ) {
    return productsCache;
  }

  const snapshot =
    await getDocs(productsCollection);

  const products = snapshot.docs.map(
    (document) => ({
      id: document.id,
      ...(document.data() as Omit<
        Product,
        "id"
      >),
    })
  );

  productsCache = products;
  productsCacheTime = now;

  return products;
}

// =====================================================
// Get Single Product
// =====================================================

export async function getProductById(
  id: string
): Promise<Product | null> {
  const productRef =
    doc(db, "products", id);

  const snapshot =
    await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<
      Product,
      "id"
    >),
  };
}

// =====================================================
// Live Products
// =====================================================

export function subscribeProducts(
  callback: (
    products: Product[]
  ) => void
) {
  return onSnapshot(
    productsCollection,
    (snapshot) => {
      const products =
        snapshot.docs.map(
          (document) => ({
            id: document.id,
            ...(document.data() as Omit<
              Product,
              "id"
            >),
          })
        );

      productsCache = products;
      productsCacheTime = Date.now();

      callback(products);
    }
  );
}

// =====================================================
// Add Product
// =====================================================

export async function addProduct(
  product: Omit<
    Product,
    "id"
  >
) {
  const result =
    await addDoc(
      productsCollection,
      product
    );

  invalidateProductsCache();

  return result;
}

// =====================================================
// Update Product
// =====================================================

export async function updateProduct(
  id: string,
  product: Partial<Product>
) {
  const productRef =
    doc(
      db,
      "products",
      id
    );

  await updateDoc(
    productRef,
    product
  );

  invalidateProductsCache();
}

// =====================================================
// Delete Product
// =====================================================

export async function deleteProduct(
  id: string
) {
  const productRef =
    doc(
      db,
      "products",
      id
    );

  await deleteDoc(
    productRef
  );

  invalidateProductsCache();
}
