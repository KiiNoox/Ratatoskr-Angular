import {Roles} from "./Roles";
import {product_type} from "./product_type";
import {User_orders} from "./user_orders";
import {User_shoppingcart} from "./user_shoppingcart";




export class currentUser {

  email?:string;
  adress?: string;
  firstName?: string;
  country?: string;
  lastName?: string;
  birthDate?: Date;
  phoneNumber?: string;
  img_URL?: string;
  roles?: Roles[];
  user_orders?: User_orders[];
  shoppingCart?: User_shoppingcart;
  token?: string;
  id?:number;
}
