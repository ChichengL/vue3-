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
  phone?: string
  roleName?: string
}

export interface UserResponseData extends responseData {
  data: {
    records: User[]
    total: number
    size: number
    current: number
    pages: number
  }
}

export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}

export interface RoleResponseData extends responseData {
  data: {
    assignRoles: RoleData[]
    allRolesList: RoleData[]
  }
}
export interface SetRoleData {
  roleIdList: number[]
  userId: number
}
