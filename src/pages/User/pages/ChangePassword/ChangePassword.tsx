import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import { toast as ToastError } from 'react-toastify'
import Toast from 'src/components/Toast'
import { ResponseApi } from 'src/types/utils.type'
import { UserChema, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import InputPassword from 'src/components/InputPassword'
type FromDataInput = Pick<UserChema, 'password' | 'confirmPassword' | 'newPassword'>
const passwordSchema = userSchema.pick(['password', 'confirmPassword', 'newPassword'])//này dùng cho yun resover
export default function ChangePassword() {
  const [showToast, setShowToast] = useState(false) // Trạng thái hiển thị Toast
  const { register, setError, handleSubmit, formState: { errors }, reset } = useForm<FromDataInput>({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: ''
    }, resolver: yupResolver(passwordSchema)
  })
  const changePasswordMutation = useMutation({
    mutationFn: (body: FromDataInput) => userApi.changePassword(body),
  });
  const onSubmit = handleSubmit(async (data) => {
    // Gọi mutation
    await changePasswordMutation.mutateAsync(data, {
      onSuccess: () => {
        reset();
        setShowToast(false); // Đặt Toast thành `false` để reset
        setTimeout(() => setShowToast(true), 0); // Đặt Toast lại `true` để hiển thị
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<FromDataInput>>(error)) {
          const formError = error.response?.data.response
          if (formError) {
            Object.keys(formError).forEach((key) => {
              const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1); // Chuyển đổi key về chữ thường
              console.log('lowerCaseKey', lowerCaseKey)
              if (lowerCaseKey === 'profilePricture') {
                ToastError.error('Cập nhật mật khẩu không thành công vui lòng thử lại')
              }
              setError(lowerCaseKey as keyof FromDataInput, {
                message: formError[key as keyof FromDataInput] as string,
                type: 'Server'
              })
            })
          }
        }
      },
    });
  });
  return (<Fragment>
    {showToast && <Toast message='Thay đổi mật khẩu thành công.!' />}
    <div className='rounded-sm bg-white px pb-10 md:px-7 md:pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sở để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 mr-auto max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow pr-5 md:pr-12 md:mt-0'>
          <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-6 sm:text-right'>Mật khẩu cũ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <InputPassword className='mt-2'
                register={register} name='password' type='password' placeholder='Mật khẩu cũ' errorMessage={errors.password?.message}></InputPassword>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-6 sm:text-right'>Mật khẩu mới</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <InputPassword className='mt-2'
                register={register} type='password' name='newPassword' placeholder='Mật khẩu mới' errorMessage={errors.newPassword?.message}></InputPassword>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap flex-col sm:flex-row justify-center'>
            <div className='sm:w-[20%] truncate pt-6 sm:text-right'>Nhập lại mật khẩu</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <InputPassword className='mt-2'
                register={register} type='password' name='confirmPassword' placeholder='Nhập lại mật khẩu' errorMessage={errors.confirmPassword?.message}></InputPassword>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button className='flex items-center h-9 bg-orange px-5 text-white text-center text-sm hover:bg-orange/80 rounded-sm' >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </Fragment>)
}
