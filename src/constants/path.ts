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

export default path
