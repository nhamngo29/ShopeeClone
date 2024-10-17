import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/input'
import { getRules, schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
type FormData = Schema
export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: FormData) => registerAccount(body)
  })
  //const rules = getRules(getValues)
  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
          const formError = error.response?.data.response
          if (formError) {
            console.log('From eror', formError)
            Object.keys(formError).forEach((key) => {
              if (key in formError) {
                setError(key as keyof FormData, {
                  message: formError[key as keyof FormData],
                  type: 'Server'
                })
              }
            })
          }
        }
      }
    })
  })
  console.log(errors)
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                name='userName'
                register={register}
                type='userName'
                className='mt-2'
                errorMessage={errors.userName?.message}
                placeholder='Tên đăng nhập'
              />
              <Input
                name='fullName'
                register={register}
                type='fullName'
                className='mt-2'
                errorMessage={errors.fullName?.message}
                placeholder='Họ và tên'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.password?.message}
                placeholder='Mật khẩu'
                autoComplete='on'
              />
              <Input
                name='PasswordConfirm'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.PasswordConfirm?.message}
                placeholder='Mật khẩu'
                autoComplete='on'
              />
              <div className='mt-6'>
                <button className='bg-[#ee4d2d] uppercase w-full text-center py-3 px-2 text-white text-sm hover:bg-[#e2492b] font-bold opacity-65'>
                  Tiếp theo
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản? </span>
                <Link className='text-red-600 ml-1' to={'/login'}>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
