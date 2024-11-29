import axios, { AxiosError, AxiosInstance } from 'axios'

import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatuscode.enum'
import { getRefreshTokenFormLS, clearFormLS, setRefreshTokenToLS, setProfileToLS } from './auth'
import { pathApi } from 'src/constants/path'
import { decodeJwtToUser } from './utils'
import { AuthResponse } from 'src/types/auth.type'
class Http {
  instance: AxiosInstance
  private refreshToken: string
  constructor() {
    this.refreshToken = getRefreshTokenFormLS()
    this.instance = axios.create({
      baseURL: 'https://localhost:7224/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true // Đảm bảo rằng đây được đặ
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.refreshToken && config.headers) {
          config.withCredentials = true // Gửi cookie đi kèm
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === pathApi.login || url === pathApi.register) {
          const data = response.data as AuthResponse
          this.refreshToken = data.response?.refreshToken || ''
          setRefreshTokenToLS(this.refreshToken)
          const user = decodeJwtToUser(data.response?.accessToken || '')
          setProfileToLS(user)
        } else if (url === pathApi.logout) {
          this.refreshToken = ''
          clearFormLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (
          error.response?.status !== HttpStatusCode.UnprocessableEntity &&
          error.response?.status !== HttpStatusCode.Conflict &&
          error.response?.status !== HttpStatusCode.Unauthorized
        ) {
          const data: any | undefined = error.response?.data
          const message = data.Message || error.message
          toast.error(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearFormLS()
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance

export default http
