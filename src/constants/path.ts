const path = {
  home: '/',
  profile: '/profile',
  login: '/login',
  register: '/register',
  logout: '/logout'
} as const
export const pathApi = {
  home: '/',
  profile: 'profile',
  login: 'api/Auth/sign-in',
  register: 'api/Auth/sign-up',
  logout: 'api/Auth/sign-out',
  products: 'api/Product/products',
  categories: 'api/Category/categoies'
} as const
export default path
