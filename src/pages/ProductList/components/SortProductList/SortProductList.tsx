import { ProductListConfig } from 'src/types/product.type'
import classNames from 'classnames'
import { orderBy as orderByConstant } from 'src/constants/product'
import { order as orderConstant } from 'src/constants/product'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { orderBy = orderByConstant.createAt, page } = queryConfig
  const { order } = queryConfig
  const pageNumber = Number(page)
  const navigate = useNavigate()
  const isActiveOrderBy = (orderByValue: Exclude<ProductListConfig['orderBy'], undefined>) => {
    return orderBy === orderByValue
  }
  const handleSort = (orderByValue: Exclude<ProductListConfig['orderBy'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            orderBy: orderByValue
          },
          ['order', 'page']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            order: String(orderValue),
            orderBy: orderByConstant.price
          },
          ['page']
        )
      ).toString()
    })
  }
  return (
    <div className='bg-gray-300/40 px-3 py-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames(
              'h-8 px-4 capitalize text-sm rounded-sm',
              isActiveOrderBy(orderByConstant.createAt)
                ? 'bg-orange text-white hover:bg-orange/80'
                : 'bg-white text-black hover:bg-slate-100'
            )}
            onClick={() => handleSort(orderByConstant.createAt)}
          >
            Phổ biến
          </button>
          <button
            className={classNames(
              'h-8 px-4 capitalize text-sm rounded-sm',
              isActiveOrderBy(orderByConstant.view)
                ? 'bg-orange text-white hover:bg-orange/80'
                : 'bg-white text-black hover:bg-slate-100'
            )}
            onClick={() => handleSort(orderByConstant.view)}
          >
            Mới nhất
          </button>
          <button
            className={classNames(
              'h-8 px-4 capitalize text-sm rounded-sm',
              isActiveOrderBy(orderByConstant.sold)
                ? 'bg-orange text-white hover:bg-orange/80'
                : 'bg-white text-black hover:bg-slate-100'
            )}
            onClick={() => handleSort(orderByConstant.sold)}
          >
            Bán chạy
          </button>
          <select
            className='h-8 px-4 bg-white text-left text-sm outline-none capitalize border border-gray-300 rounded-sm shadow-sm focus:border-gray-400'
            title='Giá'
            defaultValue={order}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled hidden>
              Giá
            </option>
            <option value={orderConstant.desc}>Giá: Thấp đến cao</option>
            <option value={orderConstant.asc}>Giá: Cao đến Thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/</span>
            <span>{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (pageNumber - 1).toString()
                }).toString()
              }}
              type='button'
              className={classNames('flex w-9 justify-center items-center shadow  h-8 rounded-tl-sm rounded-bl-sm', {
                'cursor-pointer bg-white hover:bg-slate-100': pageNumber > 1,
                ' pointer-events-none bg-white/60 hover:bg-slate-100': pageNumber === 1
              })}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            </Link>

            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (pageNumber + 1).toString()
                }).toString()
              }}
              className={classNames('shadow flex w-9 justify-center items-center h-8 rounded-tl-sm rounded-bl-sm', {
                'cursor-pointer bg-white hover:bg-slate-100': pageNumber < pageSize,
                'cursor-not-allowed bg-white/60 hover:bg-slate-100  pointer-events-none': pageNumber === pageSize
              })}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
