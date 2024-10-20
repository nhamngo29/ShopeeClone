import axios, { AxiosError, AxiosInstance } from 'axios'

import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatuscode.enum'
import { clearAccesToeknFormLS, getAccesToeknFormLS, saveAccesToeknToLS } from './auth'
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccesToeknFormLS()
    this.instance = axios.create({
      baseURL: 'http://localhost:5129/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
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
        console.log(url)
        if (url === 'api/Auth/Login' || url === 'api/Auth/Register') {
          console.log(url)
          this.accessToken = response.data.response.accessToken
          saveAccesToeknToLS(this.accessToken)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearAccesToeknFormLS()
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
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance

export default http
