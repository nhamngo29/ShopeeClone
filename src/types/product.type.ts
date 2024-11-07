export interface Product {
  id: string
  price: number
  rating: number
  quantity: number
  sold: number
  view: number
  name: string
  image: string
  images: string[]
  cateogry: {
    name: string
    id: string
  }
}
export interface ProductList {
  items: Product[]
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
  hasPrevious: Boolean
  hasNext: Boolean
}
export interface ProductListConfig {
  page?: number | string
  pageSize?: number
  orderBy?: 'createAt' | 'view' | 'sold' | 'price'
  order?: boolean
  ascending?: boolean
  exclude?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
}
