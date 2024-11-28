import { useForm } from 'react-hook-form'
import { schema, Schema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
type FromData = Pick<Schema, 'keyword'>
const nameSchema = schema.pick(['keyword'])
export default function useSearchProducts() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FromData>({
    defaultValues: {
      keyword: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            keyword: data.keyword
          },
          ['order', 'orderBy', 'page']
        )
      : omit(
          {
            ...queryConfig,
            keyword: data.keyword
          },
          ['page']
        )
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return {
    onSubmitSearch,
    register
  }
}
