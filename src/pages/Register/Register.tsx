import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import path from 'src/constants/path'
type FormData = Pick<Schema, 'email' | 'password' | 'confirmPassword' | 'fullName' | 'userName'>
const registerSchema = schema.pick(['email', 'confirmPassword', 'fullName', 'password', 'userName'])
export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const registerAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.registerAccount(body)
  })
  //const rules = getRules(getValues)
  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
          const formError = error.response?.data.response
          console.log('formError',formError)
          if (formError) {
            Object.keys(formError).forEach((key) => {
              if (key in formError) {
                const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1); // Chuyển đổi key về chữ thường
                setError(lowerCaseKey as keyof FormData, {
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
                name='confirmPassword'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.confirmPassword?.message}
                placeholder='Mật khẩu'
                autoComplete='on'
              />
              <div className='mt-6'>
                <Button
                  className='bg-[#ee4d2d] uppercase w-full text-center py-3 px-2 text-white text-sm hover:bg-[#e2492b] font-bold opacity-65'
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Tiếp theo
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản? </span>
                <Link className='text-red-600 ml-1' to={path.login}>
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
