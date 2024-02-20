export interface responseData {
  code: number
  message: string
  ok: boolean
}
export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username: string
  password: string
  name: string
  phone: string
  roleName: string
}

export interface UserResponseDate extends responseData {
  data: {
    records: User[]
    total: number
    size: number
    current: number
    pages: number
  }
}
