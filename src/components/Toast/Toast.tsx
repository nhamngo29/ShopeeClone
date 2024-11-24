import classNames from 'classnames'
import { useState, useEffect, useRef } from 'react'

interface ToastProps {
  timeout?: number
  message?: string
}

export default function Toast({ timeout = 3000, message = 'Thành công' }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const toastRef = useRef<HTMLDivElement>(null)

  // Hàm xử lý khi nhấp chuột ra ngoài Toast
  const handleClickOutside = (event: MouseEvent) => {
    if (!toastRef.current) return

    const isClickedOutside = !toastRef.current.contains(event.target as Node)

    if (isClickedOutside) {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    // Đặt thời gian tự động ẩn Toast sau `timeout` (mặc định là 3000ms)
    const timer = setTimeout(() => {
      console.log('Timeout reached! Closing Toast...')
      setIsVisible(false)
    }, timeout)

    // Dọn dẹp timer khi component unmount
    return () => clearTimeout(timer)
  }, [timeout])

  // Nếu Toast không hiển thị thì return null để không render
  if (!isVisible) return null

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-[99] bg-transparent'
      onClick={() => {
        console.log('Overlay clicked. Closing Toast...')
        setIsVisible(false) // Đóng Toast nếu click vào overlay
      }}
    >
      <div
        ref={toastRef} // Gán ref vào Toast thực tế
        className={classNames(
          'p-10 bg-[rgba(0,0,0,0.7)] rounded-sm text-white inline-block max-w-96 min-w-72 text-center',
          'transition-opacity duration-500 ease-[cubic-bezier(0.4, 0, 0.6, 1)]',
          { 'opacity-100': isVisible, 'opacity-0': !isVisible }
        )}
        onClick={(e) => {
          e.stopPropagation() // Ngăn chặn sự kiện từ overlay
        }}
      >
        <div className='flex-col justify-center items-center flex'>
          <div className='flex justify-center items-center bg-[#00bfa5] rounded-full h-14 text-center w-14 mb-5'>
            <img
              className='w-7 h-7'
              src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/9057d6e718e722cde0e8.svg'
              alt='icon tick bold'
            />
          </div>
          <div className='w-full'>{message}</div>
        </div>
      </div>
    </div>
  )
}
