import classNames from 'classnames'
interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}
const RANGE = 2
export default function Pagination({ page, setPage, pageSize }: Props) {
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button
            key={`dot-before-${index}`}
            className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
          >
            ...
          </button>
        )
      }
      return null
    }

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button
            key={`dot-after-${index}`}
            className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
          >
            ...
          </button>
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
          <button
            key={pageNumber}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
              'border-orange': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }
  console.log(page)
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      <button
        className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 border', {
          'cursor-pointer': page > 1,
          'cursor-not-allowed': page === 1
        })}
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
      >
        Prev
      </button>
      {renderPagination()}
      <button
        className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 border', {
          'cursor-pointer': page < pageSize,
          'cursor-not-allowed': page === pageSize
        })}
        onClick={() => setPage(Math.min(page + 1, pageSize))}
        disabled={page === pageSize}
      >
        Next
      </button>
    </div>
  )
}
