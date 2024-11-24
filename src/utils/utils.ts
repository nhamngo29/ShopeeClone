import axios, { AxiosError, HttpStatusCode } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { User } from 'src/types/user.type'
import { array } from 'yup'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
//Dùng cho validtion entity
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return (
    isAxiosError(error) &&
    (error.response?.status === HttpStatusCode.UnprocessableEntity ||
      error.response?.status === HttpStatusCode.Conflict)
  )
}
//Dùng cho Unauthorized
export function isAxiosUnauthorized<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function decodeJwtToUser(tokenJwt: string): User {
  const decoded: any = jwtDecode(tokenJwt)
  const userProfile: User = {
    userId: decoded.jti,
    fullName: decoded.fullName,
    role: decoded.role,
    email: decoded.email,
    userName: decoded.sub
    // Thêm các thông tin khác nếu cần
  }
  return userProfile
}

export function formatCurrency(curency: number) {
  return new Intl.NumberFormat('de-DE').format(curency)
}
export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
}
export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i.${id}`
}
const removeSpecialCharacter = (str: string) =>
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
export const getIdFromNameId = (nameId: string) => {
  const array = nameId.split('-i.')
  return array[array.length - 1]
}
