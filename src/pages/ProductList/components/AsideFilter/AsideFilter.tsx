import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import path, { pathApi } from 'src/constants/path'
import { QueryConfig } from '../../ProductList'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import { omit } from 'lodash'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import RatingStarts from '../RatingStarts'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
type FromData = Pick<Schema, 'maxPrice' | 'minPrice'>
/*
các rules validation khoảng giá
1. maxPrice phải lớn hơn minPrice
2. minPrice không nhỏ hơn 1
*/
const priceSchema = schema.pick(['minPrice', 'maxPrice'])
export default function AsideFilter({ queryConfig, categories }: Props) {
  const { categoryId } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FromData>({
    mode: 'onSubmit',
    defaultValues: {
      minPrice: '',
      maxPrice: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  const navigate = useNavigate()
  const handleOnSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        maxPrice: data.maxPrice || '',
        minPrice: data.minPrice || ''
      }).toString()
    })
  })
  const handleRemoveAllFilter = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig
          },
          ['maxPrice', 'minPrice', 'ratingFilter', 'categoryId', 'page']
        )
      ).toString()
    })
  }
  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange': !categoryId
        })}
      >
        <svg viewBox='0 0 12 10' className='w-3 h-4 mr-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = categoryItem.id === categoryId
          return (
            <li className='py-2 pl-2' key={categoryItem.id}>
              <Link
                to={{
                  pathname: pathApi.home,
                  search: createSearchParams(
                    omit(
                      {
                        ...queryConfig,
                        categoryId: categoryItem.id
                      },
                      ['page']
                    )
                  ).toString()
                }}
                className={classNames('relative px-2', {
                  'text-orange font-semibold': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='fill-orange h-2 w-2 absolute top-1 left-[-10px]'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='flex items-center font-bold mt-4 uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='w-3 h-4 fill-current stroke-current mr-3'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2' onSubmit={handleOnSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='minPrice'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    value={field.value}
                    ref={field.ref}
                    placeholder='₫ TỪ'
                    classNameError='hidden'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('maxPrice')
                    }}
                  />
                )
              }}
            />

            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='maxPrice'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    classNameError='hidden'
                    placeholder='₫ ĐẾN'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('minPrice')
                    }}
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm text-center'>{errors.minPrice?.message}</div>
          <Button className='bg-orange w-full p-2 uppercase text-white text-sm hover:bg-orange/80'>Áp dụng</Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStarts queryConfig={queryConfig} />
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button
        className='w-full py-2 px-2 uppercase bg-orange text-white hover:bg-orange/80'
        onClick={() => {
          handleRemoveAllFilter()
        }}
      >
        xóa tất cả
      </Button>
    </div>
  )
}
