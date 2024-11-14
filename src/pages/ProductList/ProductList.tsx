import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined, orderBy } from 'lodash'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import SortProductList from './components/SortProductList'
import useQueryParams from 'src/hooks/useQueryParams'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import categoryAPi from 'src/apis/category.api'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      orderBy: queryParams.orderBy,
      exclude: queryParams.exclude,
      order: queryParams.order,
      categoryId: queryParams.categoryId,
      name: queryParams.name,
      ascending: queryParams.ascending,
      maxPrice: queryParams.maxPrice,
      minPrice: queryParams.minPrice,
      ratingFilter: queryParams.ratingFilter
    },
    isUndefined
  )
  const { data: productsData } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData
  })
  const { data: categoriesData } = useQuery({
    queryKey: ['categoies'],
    queryFn: () => {
      return categoryAPi.getCategories()
    }
  })
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.response || []} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.response?.totalPages || 1} />
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {productsData?.data.response?.items.map((product) => (
                  <div className='col-span-1' key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.response?.totalPages || 1} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
