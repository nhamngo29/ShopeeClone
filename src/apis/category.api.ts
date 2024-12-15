
import { Category } from 'src/types/category.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
import { pathApi } from './auth.api'
const categoryAPi = {
  getCategories() {
    return http.get<ResponseApi<Category[]>>(pathApi.categories)
  }
}
export default categoryAPi
