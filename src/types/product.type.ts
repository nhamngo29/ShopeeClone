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
  pageIndex?: number
  pageSize?: number
  sort_by?: 'createAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number
  price_max?: number
  price_min?: number
  name?: string
}
