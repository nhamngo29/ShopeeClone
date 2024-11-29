const path = {
  home: '/',
  profile: '/user/profile',
  changPassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/login',
  user: '/user',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart'
} as const
export const pathApi = {
  home: '/',
  profile: 'profile',
  login: 'api/Auth/sign-in',
  register: 'api/Auth/sign-up',
  logout: 'api/Auth/sign-out',
  products: 'api/Product/products',
  product: 'api/Product/product',
  categories: 'api/Category/categoies',
  addCartItem: 'api/Cart/add-to-cart',
  getCartItem: 'api/Cart/get-items-in-cart',
  deleteCartItem: 'api/Cart/delete-cart-item',
  updateCartItem: 'api/Cart/update-cart-item'
} as const
export default path
