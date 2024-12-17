import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import SortProductList from './components/SortProductList'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import categoryAPi from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Helmet } from 'react-helmet-async'

export default function ProductList() {
  const queryConfig = useQueryConfig()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000 //3 phút
  })
  const { data: categoriesData } = useQuery({

    queryKey: ['categoies'],
    queryFn: () => {
      return categoryAPi.getCategories()
    },
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000 //3 phút
  })
  console.log('productsData', productsData)
  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>Trang chủ | Shopee Clone</title>
        <meta name="description" content={`Trang chủ. Mua hàng qua mạng uy tín, tiện lợi. Shopee Clone đảm bảo nhận hàng, hoặc được hoàn lại tiền Giao Hàng Miễn Phí. XEM NGAY!`} />
      </Helmet>
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
                  <div className='col-span-1' key={product.productId}>
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
