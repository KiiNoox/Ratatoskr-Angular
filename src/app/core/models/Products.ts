export class Products {
  idProducts!: number;
  nameProducts!: string;
  description!: string;
  price!: any;
  adressProducts!: string;
  regionProducts!: string;
  available!: boolean;
  numberOfStock!: any;
  category!: ProductCategory;
  currencyType!: String;
  cur!:string
}

export enum ProductCategory {

  Food="Food",
  Electronics="Electronics",
  Home="Home",
  Health="Health",
  Beauty="Beauty",
  Toys="Toys",
  Books="Books",
  Other="Other"
}
export enum Currency {
"TND",
"EUR",
"USD"
}
