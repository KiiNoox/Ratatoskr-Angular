export class product_type {
  available?: boolean;
  description?: string;
  product_order?: any[]; // You can replace `any` with a more specific type if needed
  idProducts?: number;
  numberOfStock?: number;
  nameProducts?: string;
  price?: number;
  category?: string | null;
  adressProducts?: string;
  regionProducts?: string;
}
