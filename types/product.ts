export interface Product {
  id?: string;

  brand: string;
  model: string;

  processor: string;
  ram: string;
  storage: string;
 display: string;

  price: number;
  originalPrice: number;

  warranty: string;
  stock: boolean;

  image: string;

  rating: number;
  reviews: number;

  gift: string;
  offer: string;
}