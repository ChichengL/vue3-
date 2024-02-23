import request from '@/utils/request.ts'
import { RoleResponseData } from './type'
enum API {
  ALLROLES_URL = '/admin/acl/role/',
  ADDROLE_URL = '/admin/acl/role/save',
  UPDATEROLE_URL = '/admin/acl/role/update',
  ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
  SERPERMISSION_URL = '/admin/acl/permission/doAssign/?',
  DELETEROLE_URL = '/admin/acl/role/remove/',
}
export const requestRoleList = (page: number, size: number, roleName: string) =>
  request.get<any, RoleResponseData>(
    API.ALLROLES_URL + `${page}/${size}/?roleName=${roleName}`,
  )

export const requestAddOrUpdateRole = (data: any) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}
export const requestAllPermission = (roleId: number) =>
  request.get<any, any>(API.ALLPERMISSION_URL + roleId)
export const requestSerPermission = (
  roleId: number,
  permissionId: number[],
) => {
  return request.post<any, any>(
    API.SERPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )
}

export const requestDeleteRole = (id: number) =>
  request.delete<any, any>(API.DELETEROLE_URL + id)
