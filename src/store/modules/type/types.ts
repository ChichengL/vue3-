// 仓库类型
import { Data } from '@/api/product/attr/type'
import type { RouteRecordRaw } from 'vue-router'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}
export interface CategoryState {
  c1Id: number | string
  c1Arr: Data[]
  c2Id: number | string
  c2Arr: Data[]
  c3Id: number | string
  c3Arr: Data[]
}
