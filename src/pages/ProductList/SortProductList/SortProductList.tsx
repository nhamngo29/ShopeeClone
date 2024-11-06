import { ProductListConfig } from 'src/types/product.type'
import { QueryConfig } from '../ProductList'
import classNames from 'classnames'
import { _orderBy } from 'src/constants/product'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { orderBy = _orderBy.createAt, page } = queryConfig
  const pageNumber = Number(page)
  const navigate = useNavigate()
  const isActiveOrderBy = (orderByValue: Exclude<ProductListConfig['orderBy'], undefined>) => {
    return orderBy === orderByValue
  }
  const handleSort = (orderByValue: Exclude<ProductListConfig['orderBy'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        orderBy: orderByValue
      }).toString()
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
              isActiveOrderBy(_orderBy.view)
                ? 'bg-orange text-white hover:bg-orange/80'
                : 'bg-white text-black hover:bg-slate-100'
            )}
            onClick={() => handleSort(_orderBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames(
              'h-8 px-4 capitalize text-sm rounded-sm',
              isActiveOrderBy(_orderBy.createAt)
                ? 'bg-orange text-white hover:bg-orange/80'
                : 'bg-white text-black hover:bg-slate-100'
            )}
            onClick={() => handleSort(_orderBy.createAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames(
              'h-8 px-4 capitalize text-sm rounded-sm',
              isActiveOrderBy(_orderBy.sold)
                ? 'bg-orange text-white hover:bg-orange/80'
                : 'bg-white text-black hover:bg-slate-100'
            )}
            onClick={() => handleSort(_orderBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className='h-8 px-4 bg-white text-left text-sm outline-none capitalize border border-gray-300 rounded-sm shadow-sm focus:border-gray-400'
            title='Giá'
            defaultValue=''
          >
            <option value='' disabled hidden>
              Giá
            </option>
            <option value='price:asc'>Giá: Thấp đến cao</option>
            <option value='price:desc'>Giá: Cao đến Thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/</span>
            <span>{pageSize}</span>
          </div>
          <div className='ml-2'>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (pageNumber - 1).toString()
                }).toString()
              }}
            >
              <button
                type='button'
                className={classNames('shadow px-3 h-8 rounded-tl-sm rounded-bl-sm', {
                  'cursor-pointer bg-white hover:bg-slate-100': pageNumber > 1,
                  'cursor-not-allowed bg-white/60 hover:bg-slate-100': pageNumber === 1
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
              </button>
            </Link>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (pageNumber + 1).toString()
                }).toString()
              }}
            >
              <button
                className={classNames('shadow px-3 h-8 rounded-tl-sm rounded-bl-sm', {
                  'cursor-pointer bg-white hover:bg-slate-100': pageNumber < pageSize,
                  'cursor-not-allowed bg-white/60 hover:bg-slate-100': pageNumber === pageSize
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
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
