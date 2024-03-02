interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface BaseData {
  id?: number
  createTime?: string
  updateTime?: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: BaseData[]
  select?: boolean
}

export interface responsePermissionData extends responseData {
  data: BaseData[]
}

export interface Params {
  id?: number
  code: string
  level: number
  name: string
  pid: number
}
