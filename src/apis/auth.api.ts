import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const registerAccount = (body: { email: string; password: string; PasswordConfirm: string }) =>
  http.post<AuthResponse>('api/Auth/Register', body)
export const loginAccount = (body: { userName: string; password: string }) =>
  http.post<AuthResponse>('api/Auth/Login', body)
