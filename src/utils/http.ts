import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatuscode.enum'
import { getRefreshTokenFormLS, clearFormLS, setRefreshTokenToLS, setProfileToLS } from './auth'
import { decodeJwtToUser, isAxiosExpiredRefreshTokenError, isAxiosUnauthorized } from './utils'
import { AuthResponse, RefreshTokenReponse } from 'src/types/auth.type'
import config from 'src/constants/config'
import { pathApi } from 'src/apis/auth.api'

class Http {
  instance: AxiosInstance
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.refreshToken = getRefreshTokenFormLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true // Đảm bảo rằng đây được đặt
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
      (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Conflict, HttpStatusCode.Unauthorized, HttpStatusCode.ExpiredRefreshToken].includes(
            error.response?.status as number
          )
        ) {
          const data: any | undefined = error.response?.data
          const message = data.Message || error.message
          toast.error(message)
        }
        if (isAxiosUnauthorized(error) && !originalRequest._retry) {
          // Đánh dấu request này đã thử refresh token
          originalRequest._retry = true

          // Refresh token nếu chưa có yêu cầu refresh đang được thực hiện
          this.refreshTokenRequest = this.refreshTokenRequest
            ? this.refreshTokenRequest
            : this.handleRefreshToken().finally(() => {
                setTimeout(()=>{
                  this.refreshTokenRequest = null
                },50000)
              })

          return this.refreshTokenRequest
            .then((newToken) => {
              // Cập nhật header Authorization với token mới
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`
              }
              return this.instance(originalRequest) // Gọi lại request với token mới
            })
            .catch((refreshError) => {
              clearFormLS()
              this.refreshToken = ''
              return Promise.reject(refreshError)
            })
        } else if (isAxiosExpiredRefreshTokenError(error)) {
          this.refreshToken = ''
          clearFormLS()
        }
        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenReponse>(pathApi.refreshToken, {
        refreshToken: this.refreshToken
      })
      .then((res) => {
        const refreshToken = res.data.response?.refreshToken || ''
        setRefreshTokenToLS(refreshToken)
        return (this.refreshToken = refreshToken)
      })
      .catch((error) => {
        clearFormLS()
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http
