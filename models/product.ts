export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: Rating;
  quantity?: number;
}

export type Rating = {
  rate: number;
  count: number;
}