import { ResponseApi } from './utils.type'

export type Autho = ResponseApi<{
  accessToken: string
  expires: string
}>
