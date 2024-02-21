import request from '@/utils/request.ts'
import { RoleResponseData } from './type'
enum API {
  ALLROLES_URL = '/admin/acl/role/',
}
export const requestRoleList = (page: number, size: number, roleName: string) =>
  request.get<any, RoleResponseData>(
    API.ALLROLES_URL + `${page}/${size}/?roleName=${roleName}`,
  )
