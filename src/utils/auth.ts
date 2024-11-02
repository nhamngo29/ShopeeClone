import { User } from 'src/types/user.type'
import { json } from 'stream/consumers'

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}
export const clearFormLS = () => {
  localStorage.removeItem('refresh_token'), localStorage.removeItem('profile')
}
export const getRefreshTokenFormLS = () => {
  return localStorage.getItem('refresh_token') || ''
}
export const getProfilefromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
