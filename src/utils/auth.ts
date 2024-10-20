export const saveAccesToeknToLS = (access_token: string) => {
  localStorage.setItem('access_token', 'Bearer ' + access_token)
}
export const clearAccesToeknFormLS = () => {
  localStorage.removeItem('access_token')
}
export const getAccesToeknFormLS = () => {
  return localStorage.getItem('access_token') || ''
}
