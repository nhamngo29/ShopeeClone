import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'
export const pathApi = {
  home: '/',
  login: 'api/Auth/sign-in',
  register: 'api/Auth/sign-up',
  logout: 'api/Auth/sign-out',
  products: 'api/Product/products',
  product: 'api/Product/product',
  categories: 'api/Category/categoies',
  addCartItem: 'api/Cart/add-to-cart',
  getCartItem: 'api/Cart/get-items-in-cart',
  deleteCartItem: 'api/Cart/delete-cart-item',
  updateCartItem: 'api/Cart/update-cart-item',
  profile:'api/User/me',
  uploadAvatar:'api/User/upload-avatar',
  order:'api/Order',
  refreshToken:'/api/Auth/refresh-token'
} as const
const authApi = {
  registerAccount: (body: { email: string; password: string; confirmPassword: string }) =>
    http.post<AuthResponse>(pathApi.login, body),
  loginAccount: (body: { userName: string; password: string }) => http.post<AuthResponse>(pathApi.login, body),
  logout: () => http.post(pathApi.logout, {}),
  refeshToken:(body:string)=>http.post(pathApi.refreshToken,body)
}
export default authApi
