import { Orders } from "./orders.model";
import { User } from "./user";

export class Delivery {
    idDelivery!: number;
    starDate!: Date;
    estimatedDate!: Date;
    statusType!: string;
    deliveredBy!: User;
    ordersList: Orders[]=[];
  
    
  }
