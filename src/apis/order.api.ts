
import { pathApi } from "src/constants/path";
import { ResponseApi } from "src/types/utils.type";
import http from "src/utils/http";

const orderApi={
    order(body:{ productId: string; quantity: number }[]){
        return http.post<ResponseApi<string>>(pathApi.order,body)
    }
}
export default orderApi