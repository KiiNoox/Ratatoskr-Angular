import {HashedPWD} from "./hashed-pwd";
import {Roles} from "./Roles";
import {Chat} from "./chat";


export class User {
  Id?:number;
  firstName?:string;
  lastName?:string;
  birthDate?:string|null;

roles?:Roles[];
  adress?:string;
email?:string;
  //Anti Bot + PWD Recover
Token?:number;
  phoneNumber?:number;
 Img_URL?:string;
  country?:string;
 joined?:Date;
  enabled?:boolean;
//Relation Messages
//  List<Message> ReceivedList;
  //Relation PWD
   hashedPWD?:HashedPWD;
  //Relation fees
//  Fees fees;
//  List<Inquiry> InquiryList;
  //Relation Product
//  List<Products> ProductList;
  //Relation Orders
//  List<Orders> User_orders;
//  ShoppingCart shoppingCart;

}
