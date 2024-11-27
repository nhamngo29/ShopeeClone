import { pathApi } from 'src/constants/path'
import { CartItem, CartItems } from 'src/types/cart.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
const cartApi = {
  addToCart(body: { productId: string; quantity: number }) {
    return http.post<ResponseApi<CartItem>>(pathApi.addCartItem, body)
  },
  getItemsInCart() {
    return http.get<ResponseApi<CartItems>>(pathApi.getCartItem)
  },
  deleteCartItem(productsId: string[]) {
    return http.delete<ResponseApi<string>>(`${pathApi.deleteCartItem}`, {
      data: {
        productsId: productsId
      }
    })
  },
  updateCartItem(body: { productId: string; quantity: number }) {
    return http.patch<ResponseApi<string>>(pathApi.updateCartItem, body)
  }
}
export default cartApi
