import { Omit } from "lodash";
import { Product } from "./product.type";

export interface OrderItem extends Omit<Product,'description'>{
    quantity:number,
    priceBuy:number
}
export interface OrderItemList{
    status:string,
    totalAmount:number,
    items:OrderItem[]
}