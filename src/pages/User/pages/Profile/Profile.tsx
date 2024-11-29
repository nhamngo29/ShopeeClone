import Input from 'src/components/Input'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white px pb-10 md:px-7 md:pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sở của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sở để bảo mật tài khoản</div>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form className='mt-6 flex-grow pr-5 md:pr-12 md:mt-0'>
          <div className='flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>nhamngoo*****@gmail.com</div>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right'>Họ và tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input classNameInput='px-1 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'></Input>
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input classNameInput='px-1 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'></Input>
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input classNameInput='px-1 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'></Input>
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right'>Ngày sinh</div>
            <div className='flex justify-between sm:pl-5 sm:w-[50%]'>
              <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-orange outline-none'>
                <option value='' disabled selected hidden className='text-black/10'>
                  Ngày
                </option>
                <option value='1'>Option 1</option>
                <option value='2'>Option 2</option>
                <option value='3'>Option 3</option>
              </select>
              <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-orange outline-none'>
                <option value='' disabled selected hidden className='text-black/10'>
                  Tháng
                </option>
                <option value='1'>Option 1</option>
                <option value='2'>Option 2</option>
                <option value='3'>Option 3</option>
              </select>
              <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-orange outline-none'>
                <option value='' disabled selected hidden className='text-black/10'>
                  Năm
                </option>
                <option value='1'>Option 1</option>
                <option value='2'>Option 2</option>
                <option value='3'>Option 3</option>
              </select>
            </div>
          </div>
        </form>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src='https://down-vn.img.susercontent.com/file/vn-11134226-7r98o-lsrvn68ui3kp21_tn'
                alt='avatar'
                className='w-full h-full rounded-full object-cover'
              />
            </div>
            <input type='file' className='hidden' accept='.jpg,.jpeg,.png' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dung lương file tối đa 1 MB</div>
              <div>Định dạng: ,JPG, .JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
