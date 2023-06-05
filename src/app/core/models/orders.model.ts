import { Delivery } from "./delivery.model";

export class Orders {
    idOrders!: number;
    statusOrders!: string;
    broughtDate!: Date;
    confirmation!: boolean;
    shippingAdresse!: string;
    delivery!: Delivery;
    
}
