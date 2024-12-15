import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useState } from 'react'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import ZoomImage from 'src/components/ZoomImage/ZoomImage'
import 'react-medium-image-zoom/dist/styles.css'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/components/QuantityController'
import cartApi from 'src/apis/cart.api'
import Toast from 'src/components/Toast'
import path from 'src/constants/path'
import { useTranslation } from 'react-i18next'

export default function ProductDetail() {
  const { t } = useTranslation('product')
  const queryClient = useQueryClient()
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const [showToast, setShowToast] = useState(false) // Trạng thái hiển thị Toast
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const product = productDetailData?.data.response
  const currentImages = useMemo(() => product?.images.slice(...currentIndexImages), [product, currentIndexImages])
  const queryConfig: ProductListConfig = { page: '1', categoryId: product?.cateogryId }
  const navigate = useNavigate()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000 //3 phút
  })
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])
  const chooseActiveImage = (img: string) => {
    setActiveImage(img)
  }
  const next = () => {
    if (currentIndexImages[1] < (product as ProductType)?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  const addToCartMutation = useMutation({
    mutationFn: (body: { productId: string; quantity: number }) => cartApi.addToCart(body)
  })
  const addToCart = () => {
    addToCartMutation.mutate(
      {
        quantity: buyCount,
        productId: product?.productId as string
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getItemsInCart'] })
          setShowToast(false) // Đặt thành `false` trước để reset Toast
          setTimeout(() => setShowToast(true), 0) // Đặt lại `true` sau để hiển thị Toast
        }
      }
    )
  }
  const handleBuyNow = async () => {
    const res = await addToCartMutation.mutateAsync(
      {
        quantity: buyCount,
        productId: product?.productId as string
      }
    )
    const purchase = res.data.response
    navigate(path.cart, {
      state: {
        productId: purchase?.productId
      }
    })
  }
  if (!product) return <div>Loading...</div>
  return (
    <>
      {showToast && <Toast message='Thêm sản phẩm vào giỏ hàng thành công' />}
      <div className='bg-gray-200 py-6'>
        <div className='container'>
          <div className='bg-white p-4 shadow'>
            <div className='grid grid-cols-12 gap-9'>
              <div className='col-span-5'>
                <div className='relative w-full pt-[100%] shadow'>
                  <ZoomImage
                    zoomScale={3}
                    src={activeImage ?? product.image}
                    alt={product.name}
                    className='absolute top-0 left-0 h-full w-full bg-white object-cover cursor-zoom-in'
                  />
                </div>
                <div className='relative mt-4 grid grid-cols-5 gap-1'>
                  <button
                    className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                    onClick={prev}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className='size-5'
                    >
                      <path stroke-linecap='round' stroke-linejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                    </svg>
                  </button>
                  {currentImages?.map((img: string) => {
                    const isActive = img === activeImage
                    return (
                      <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActiveImage(img)}>
                        <img
                          src={img}
                          alt={product.name}
                          className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                        />
                        {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                      </div>
                    )
                  })}
                  <button
                    className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                    onClick={next}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path stroke-linecap='round' stroke-linejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='col-span-7'>
                <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
                <div className='mt-2 flex items-center'>
                  <div className='flex items-center'>
                    <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                    <ProductRating
                      rating={product.rating}
                      activeClassname='h-4 w-4 fill-orange text-orange'
                      nonActiveClass='h-4 w-4 fill-gray-300 text-gray-300'
                    />
                  </div>
                  <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                  <span className=' lowercase'>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
                <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                  <div className='text-gray-500 line-through flex items-center'>
                    <span className='text-md'>₫</span>
                    <span className='text-1xl ml-1'>20.990.000</span>
                  </div>
                  <div className='ml-3 text-3xl font-medium text-orange flex items-center'>
                    <span className='text-md'>₫</span>
                    <span className='text-2xl ml-1'>{formatCurrency(product.price)}</span>
                  </div>
                </div>
                <div className='mt-8 flex items-center'>
                  <div className='capitalize text-gray-500'>số lượng</div>
                  <QuantityController
                    onDecrease={handleBuyCount}
                    onIncrease={handleBuyCount}
                    onType={handleBuyCount}
                    value={buyCount}
                    max={product.stock}
                  />
                  <div className='ml-6 text-sm text-gray-500'>{product.stock} {t('available')}</div>
                </div>
                <div className='mt-8 flex items-center'>
                  <button
                    className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-8 capitalize text-orange shadow-sm hover:bg-orange/5'
                    onClick={addToCart}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-4 mr-[10px]'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                      />
                    </svg>
                    Thêm vào giỏ hàng
                  </button>
                  <button className='ml-5 flex h-12 items-center justify-center outline-none rounded-sm bg-orange text-white capitalize shadow-sm hover:bg-orange/90 px-5'
                    onClick={handleBuyNow}>
                    mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <div className='container'>
            <div className='mt-8 bg-white p-4 shadow'>
              <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
              <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <div className='container'>
            <div className='text-gray-500 uppercase'>có thể bản củng biết</div>
            {productsData && (
              <div className='mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
                {productsData.data.response?.items.map((product) => (
                  <div className='col-span-1' key={product.productId}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
