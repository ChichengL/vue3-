export interface responseData {
  code: number
  message: string
  ok: boolean
}
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}

export interface RoleResponseData extends responseData {
  data: {
    records: RoleData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

export interface MenuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: MenuData[]
  select: boolean
}
export interface MenuResponseData extends responseData {
  data: MenuData[]
}
