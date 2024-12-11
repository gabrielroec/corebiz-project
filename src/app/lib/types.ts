export interface Product {
  productId: number;
  productName: string;
  stars: number;
  imageUrl: string;
  listPrice?: number;
  price: number;
  installments: {
    quantity: number;
    value: number;
  }[];
}

export interface ProductsResponse {
  products: Product[];
}
