import ProductDetail from 'src/pages/ProductDetail'

const path = {
  home: '/',
  profile: '/profile',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId'
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
  addToCart: 'api/Cart/add-to-cart',
  getItemsInCart: 'api/Cart/get-items-in-cart'
} as const
export default path
