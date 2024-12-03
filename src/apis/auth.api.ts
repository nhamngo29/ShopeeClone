import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const authApi = {
  registerAccount: (body: { email: string; password: string; confirmPassword: string }) =>
    http.post<AuthResponse>('api/Auth/sign-up', body),
  loginAccount: (body: { userName: string; password: string }) => http.post<AuthResponse>('api/Auth/sign-in', body),
  logout: () => http.post('api/Auth/sign-out', {})
}
export default authApi
