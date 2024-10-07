import { UseFormGetValues } from 'react-hook-form'
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
  confirmPassword: {
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
