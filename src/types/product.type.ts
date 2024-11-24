export interface Product {
  productId: string
  price: number
  rating: number
  stock: number
  sold: number
  view: number
  name: string
  image: string
  images: string[]
  cateogryId?: string
  description: string
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
  orderBy?: 'createAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  ascending?: boolean
  exclude?: string
  ratingFilter?: number | string
  maxPrice?: number | string
  minPrice?: number | string
  keyword?: string
  categoryId?: string
}
