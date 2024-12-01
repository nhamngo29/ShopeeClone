type Role = 'User' | 'Admin'
export interface User {
  userName: string
  userId: string
  birthOfDay?:string
  avatar?:string
  email?: string
  fullName?: string
  role?: Role[]
  address?:string,
  phoneNumber?:string
}
