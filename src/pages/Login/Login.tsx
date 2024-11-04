import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/input'
import { LoginSchema, loginSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { decodeJwtToUser, isAxiosUnauthorized, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
import { useContext, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { jwtDecode } from 'jwt-decode'
import { User } from 'src/types/user.type'
import { use } from 'framer-motion/client'
type FormData = LoginSchema
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })
  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body)
  })
  const [errorLogin, setErrorLogin] = useState<string | undefined>(undefined)
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        const user = decodeJwtToUser(data.data.response?.accessToken || '')
        setProfile(user)
        navigate('/')
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
        } else if (isAxiosUnauthorized<ResponseApi<FormData>>(error)) {
          const formError = error.response?.data
          setErrorLogin(formError?.message)
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='p-10  lg:col-span-2 lg:col-start-4  bg-white shadow-sm'>
            <div className='text-2xl'>Đăng nhập</div>

            {errorLogin && (
              <div className='text-red-600 mb-4'>
                <div
                  className='mt-6 bg-[#fff9fa] border-r-2 py-3 px-[15px] box-border'
                  style={{ border: '1px solid rgba(255, 66, 79, 0.2)' }}
                >
                  {errorLogin}{' '}
                </div>
              </div>
            )}

            <form className='rounded' onSubmit={onSubmit} noValidate>
              <Input
                name='userName'
                register={register}
                type='text'
                className='mt-8'
                errorMessage={errors.userName?.message}
                placeholder='Tên đăng nhập'
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
              <div className='mt-2'>
                <Button
                  className='bg-[#ee4d2d] uppercase w-full text-center py-3 px-2 text-white text-sm hover:bg-[#e2492b] font-bold opacity-65 inline-flex justify-center items-center'
                  type='submit'
                  isLoading={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                >
                  đăng nhập
                </Button>
                <div className='my-2 flex justify-between text-[#05a]'>
                  <Link to='/'>Quên mật khẩu</Link>
                  <Link to='/'>Đăng nhập với SMS</Link>
                </div>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link className='text-red-600 ml-1' to={'/register'}>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
