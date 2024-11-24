import { pathApi } from 'src/constants/path'
import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const productApi = {
  getProducts: (params: ProductListConfig) => {
    return http.get<ResponseApi<ProductList>>(pathApi.products, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<ResponseApi<Product>>(`${pathApi.product}/${id}`)
  }
}
export default productApi
