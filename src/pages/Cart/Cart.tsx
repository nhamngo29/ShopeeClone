import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import cartApi from 'src/apis/cart.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { formatCurrency, generateNameId } from 'src/utils/utils'

export default function Cart() {
  const { data: productInCartData } = useQuery({
    queryKey: ['getItemsInCart'],
    queryFn: () => cartApi.getItemsInCart()
  })
  const producstInCartData = productInCartData?.data.response
  return (
    <div className='bg-neutral-100 py-4 md:py-16'>
      <div className='container px-4 md:px-0'>
        {/* Desktop table header - hidden on mobile */}
        <div className='hidden md:block overflow-auto'>
          <div className='rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
            <div className='grid grid-cols-12'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input type='checkbox' className='h-5 w-5 accent-orange' />
                  </div>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product list */}
        <div className='rounded-sm bg-white p-3 md:p-5 shadow mt-1 md:mt-3'>
          {producstInCartData?.products?.map((cartItem) => (
            <div
              className='flex flex-col md:grid md:grid-cols-12 rounded-sm border border-gray-200 bg-white py-4 md:py-5 px-3 md:px-4 text-gray-500 [&:not(:first-child)]:mt-3 md:[&:not(:first-child)]:mt-5'
              key={cartItem.productId}
            >
              {/* Product info section */}
              <div className='flex md:col-span-6'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input type='checkbox' className='h-5 w-5 accent-orange' />
                </div>
                <div className='flex-grow'>
                  <div className='flex'>
                    <Link
                      to={`${path.home}${generateNameId({ name: cartItem.name, id: cartItem.productId })}`}
                      className='h-20 w-20 flex-shrink-0'
                    >
                      <img src={cartItem.image} alt={cartItem.name} className='h-full w-full object-cover' />
                    </Link>
                    <div className='flex-grow px-2 pt-1 pb-2'>
                      <Link
                        to={`${path.home}${generateNameId({ name: cartItem.name, id: cartItem.productId })}`}
                        className='line-clamp-2'
                      >
                        {cartItem.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price and quantity section */}
              <div className='flex flex-col gap-2 mt-3 md:mt-0 md:col-span-6'>
                <div className='grid md:grid-cols-5 items-center'>
                  {/* Price */}
                  <div className='flex justify-between md:justify-center md:col-span-2'>
                    <span className='md:hidden'>Đơn giá:</span>
                    <div className='flex items-center'>
                      <span className='text-gray-300 line-through'>₫{formatCurrency(cartItem.price)}</span>
                      <span className='ml-3'>₫{formatCurrency(cartItem.price)}</span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className='flex justify-between items-center md:justify-center md:col-span-1'>
                    <span className='md:hidden'>Số lượng:</span>
                    <QuantityController
                      max={cartItem.stock}
                      value={cartItem.quantity}
                      classNameWrapper='flex items-center'
                    />
                  </div>

                  {/* Total */}
                  <div className='flex justify-between md:justify-center md:col-span-1'>
                    <span className='md:hidden'>Thành tiền:</span>
                    <span className='text-orange'>₫{formatCurrency(cartItem.price * cartItem.quantity)}</span>
                  </div>

                  {/* Actions */}
                  <div className='flex justify-end md:justify-center md:col-span-1'>
                    <button className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sticky bottom bar */}
        <div className='fixed md:sticky bottom-0 left-0 right-0 md:bottom-0 z-10 bg-white p-4 md:p-5 shadow-sm border-t md:border border-gray-100 mt-4'>
          <div className='container flex flex-col md:flex-row items-center gap-4 md:gap-0'>
            <div className='flex items-center'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <input type='checkbox' className='h-5 w-5 accent-orange' />
              </div>
              <button className='mx-3 border-none bg-none capitalize'>chọn tất cả</button>
              <button className='mx-3 border-none bg-none capitalize'>Xóa</button>
            </div>

            <div className='flex-1 md:ml-auto flex flex-col md:flex-row items-end justify-between md:justify-end w-full'>
              <div>
                <div className='flex items-center justify-end'>
                  <div>Tổng thanh toán (1 sản phẩm):</div>
                  <div className='ml-2 text-xl md:text-2xl text-orange'>₫{formatCurrency(123000)}</div>
                </div>
                <div className='flex items-center justify-end text-sm'>
                  <div className='text-gray-500'>Tiết kiệm</div>
                  <div className='ml-6 text-orange'>₫102</div>
                </div>
              </div>
              <Button className='w-full md:w-44 h-10 mt-3 md:mt-0 md:ml-4 bg-orange uppercase text-center text-white text-sm hover:opacity-85 font-bold inline-flex justify-center items-center'>
                Mua hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
