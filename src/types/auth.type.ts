import { ResponseApi } from './utils.type'

export type AuthResponse = ResponseApi<{
  accessToken: string
  expires: string
  refreshToken: string
  expiresRefreshToken: string
}>
export type RefreshTokenReponse=ResponseApi<{token:string,refreshToken:string}>