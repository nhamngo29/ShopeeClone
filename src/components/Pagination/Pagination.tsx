import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/pages/ProductList/ProductList'
interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
const RANGE = 2
export default function Pagination({ queryConfig, pageSize }: Props) {
  console.log('queryConfig', queryConfig)
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={`dot-before-${index}`} className='bg-white rounded px-3 py-2 shadow-sm mx-2  border'>
            ...
          </span>
        )
      }
      return null
    }

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={`dot-after-${index}`} className='bg-white rounded px-3 py-2 shadow-sm mx-2  border'>
            ...
          </span>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotBefore(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={pageNumber}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
              'border-orange': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  console.log(page)
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      <Link
        className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 border', {
          'cursor-pointer': page > 1,
          'cursor-not-allowed': page === 1
        })}
        to={{
          pathname: path.home,
          search: createSearchParams({
            ...queryConfig,
            page: (page - 1).toString()
          }).toString()
        }}
      >
        Prev
      </Link>
      {renderPagination()}
      <Link
        className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 border', {
          'cursor-pointer': page < pageSize,
          'cursor-not-allowed': page === pageSize
        })}
        to={{
          pathname: path.home,
          search: createSearchParams({
            ...queryConfig,
            page: (page + 1).toString()
          }).toString()
        }}
      >
        Next
      </Link>
    </div>
  )
}
