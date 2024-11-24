import { Product } from './product.type'

export interface CartItem extends Omit<Product, 'images' | 'description'> {
  quantity: number
  cartItemId: string
}
export interface CartItems {
  uniqueTotalCartItem: number
  totalCartItem: number
  products: CartItem[]
}
