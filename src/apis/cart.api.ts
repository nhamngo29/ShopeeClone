import { pathApi } from 'src/constants/path'
import { CartItem, CartItems } from 'src/types/cart.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
const cartApi = {
  addToCart(body: { productId: string; quantity: number }) {
    return http.post<ResponseApi<CartItem>>(pathApi.addToCart, body)
  },
  getItemsInCart() {
    return http.get<ResponseApi<CartItems>>(pathApi.getItemsInCart)
  }
}
export default cartApi
