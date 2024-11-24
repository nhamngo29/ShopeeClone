import { UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
export const getRules = (getValues?: UseFormGetValues<any>) => ({
  email: {
    required: {
      value: true,
      message: 'Vui lòng nhập email'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    minLength: {
      value: 6,
      message: 'Email tối thiểu 6 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Email tối đa 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Vui lòng nhập mật khẩu'
    },
    maxLength: {
      value: 160,
      message: 'Mật khẩu  tối đa 160 ký tự'
    },
    validate: {
      length: (value: string) => value.length >= 8 || 'Mật khẩu bắt buộc có độ dài lớn hơn 7 ký tự',
      hasUpperCase: (value: string) => /[A-Z]/.test(value) || 'Mật khẩu phải có ít nhất một ký tự viết hoa',
      hasLowerCase: (value: string) => /[a-z]/.test(value) || 'Mật khẩu phải có ít nhất một ký tự viết thường',
      hasNumber: (value: string) => /[0-9]/.test(value) || 'Mật khẩu phải có ít nhất một chữ số',
      hasSpecialChar: (value: string) => /[#?!@$%^&*-]/.test(value) || 'Mật khẩu phải có ít nhất một ký tự đặc biệt'
    }
  },
  passwordConfirm: {
    required: {
      value: true,
      message: 'Nhập lại Mật khẩu  là bắt buộc nhập'
    },
    maxLength: {
      value: 160,
      message: 'Nhập lại Mật khẩu tối đa 160 ký tự'
    },
    validate: {
      length: (value: string) => value.length >= 8 || 'Nhập lại Mật khẩu bắt buộc có độ dài lớn hơn 7 ký tự',
      hasUpperCase: (value: string) => /[A-Z]/.test(value) || 'Nhập lại Mật khẩu phải có ít nhất một ký tự viết hoa',
      hasLowerCase: (value: string) => /[a-z]/.test(value) || 'Nhập lại Mật khẩu phải có ít nhất một ký tự viết thường',
      hasNumber: (value: string) => /[0-9]/.test(value) || 'Nhập lại Mật khẩu phải có ít nhất một chữ số',
      hasSpecialChar: (value: string) =>
        /[#?!@$%^&*-]/.test(value) || 'Nhập lại Mật khẩu phải có ít nhất một ký tự đặc biệt',
      comparePassword: (value: string) => {
        const password = getValues?.('password') // Safe access using optional chaining
        return value === password || 'Nhập lại Mật khẩu không khớp'
      }
    }
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>): boolean {
  const { minPrice, maxPrice } = this.parent as { minPrice: string; maxPrice: string }
  if (minPrice !== '' && maxPrice !== '') {
    return Number(maxPrice) >= Number(minPrice)
  }
  return minPrice !== '' || maxPrice !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Email không đúng định dạng')
    .min(5, 'Email tối thiểu 5 ký tự')
    .max(160, 'Email tối đa 160 ký tự'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(8, 'Mật khẩu bắt buộc có độ dài lớn hơn 7 ký tự')
    .max(160, 'Mật khẩu tối đa 160 ký tự')
    .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất một ký tự viết hoa')
    .matches(/[a-z]/, 'Mật khẩu phải có ít nhất một ký tự viết thường')
    .matches(/[0-9]/, 'Mật khẩu phải có ít nhất một chữ số')
    .matches(/[#?!@$%^&*-]/, 'Mật khẩu phải có ít nhất một ký tự đặc biệt'),
  PasswordConfirm: yup.string().required('Vui lòng nhập lại mật khẩu'),
  // .min(8, 'Nhập lại mật khẩu bắt buộc có độ dài lớn hơn 7 ký tự')
  // .max(160, 'Nhập lại mật khẩu tối đa 160 ký tự')
  // .matches(/[A-Z]/, 'Nhập lại mật khẩu phải có ít nhất một ký tự viết hoa')
  // .matches(/[a-z]/, 'Nhập lại mật khẩu phải có ít nhất một ký tự viết thường')
  // .matches(/[0-9]/, 'Nhập lại mật khẩu phải có ít nhất một chữ số')
  // .matches(/[#?!@$%^&*-]/, 'Nhập lại mật khẩu phải có ít nhất một ký tự đặc biệt')
  // .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp'),
  userName: yup.string().required('Vui lòng nhập tên đăng nhập').min(6, 'Tên đăng phải dài hơn 6 ký tự'),
  fullName: yup
    .string()
    .required('Vui lòng nhập họ tên')
    .matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯưẠ-ỹ\s]+$/, 'Họ tên chỉ chứa chữ cái và khoảng trắng'),
  minPrice: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  maxPrice: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  keyword: yup.string().trim().required('Tìm kiếm sản phẩm bắt buộc')
})
export const loginSchema = schema.omit(['PasswordConfirm', 'email', 'fullName'])
export type LoginSchema = yup.InferType<typeof loginSchema>
export type Schema = yup.InferType<typeof schema>
