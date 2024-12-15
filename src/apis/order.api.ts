import { OrderItemList } from "src/types/order.type";
import { ResponseApi } from "src/types/utils.type";
import http from "src/utils/http";
import { OrderStatus } from "src/types/orderStatus.type";
import { pathApi } from "./auth.api";

const orderApi={
    order(body:{ productId: string; quantity: number }[]){
        return http.post<ResponseApi<string>>(pathApi.order,body)
    },
    getOrder(params: { status: OrderStatus }){
        console.log('params',params)
        return http.get<ResponseApi<OrderItemList[]>>(`${pathApi.order}?status=${params.status}`)
    }
}
export default orderApi