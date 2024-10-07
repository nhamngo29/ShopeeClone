import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/input'
import { getRules, LoginSchema, loginSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
type FormData = LoginSchema
export default function Login() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })
  const onSubmit = handleSubmit(
    () => {},
    () => {
      const password = getValues('password')
      console.log(password)
    }
  )
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
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
                <button
                  className='bg-[#ee4d2d] uppercase w-full text-center py-3 px-2 text-white text-sm hover:bg-[#e2492b] font-bold opacity-65'
                  type='submit'
                >
                  đăng nhập
                </button>
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
