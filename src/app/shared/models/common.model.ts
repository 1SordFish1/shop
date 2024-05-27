export interface Currency {
  value: string;
  view: string;
}

export interface Product  {
  id: number | null,
  image?: string | null,
  name: string | null,
  price: number | null,
  rating?: number | null,
  author?: string | null,
  description?: string | null
}
