type Role = 'User' | 'Admin'
export interface User {
  userName: string
  userId: string
  email: string
  fullName: string
  role?: Role[]
}
