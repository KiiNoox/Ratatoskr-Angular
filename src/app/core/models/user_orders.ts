import {product_type} from "./product_type";

export interface User_orders {
  shippingAdresse?: string,
  payment?: string | null,
  productsList?: product_type[],
  idOrders?: number,
  broughtDate?: Date,
  statusOrders?: string,
}
