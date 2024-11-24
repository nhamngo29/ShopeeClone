import useQueryParams from './useQueryParams'
import { isUndefined, omitBy } from 'lodash'
import { ProductListConfig } from 'src/types/product.type'
export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      orderBy: queryParams.orderBy,
      exclude: queryParams.exclude,
      order: queryParams.order,
      categoryId: queryParams.categoryId,
      keyword: queryParams.keyword,
      ascending: queryParams.ascending,
      maxPrice: queryParams.maxPrice,
      minPrice: queryParams.minPrice,
      ratingFilter: queryParams.ratingFilter
    },
    isUndefined
  )
  return queryConfig
}
