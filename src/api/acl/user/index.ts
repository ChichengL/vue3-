import request from '@/utils/request'
import type {
  RoleResponseData,
  SetRoleData,
  User,
  UserResponseData,
} from './type'
enum API {
  ALLUSER_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  ALLROLES_URL = '/admin/acl/user/toAssign/',
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  DELETEUSER_URL = '/admin/acl/user/remove/',
  DELETEUSERLIST_URL = '/admin/acl/user/batchRemove',
  ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
}
export const requestUsers = (page: number, limit: number, username: string) => {
  return request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
  )
}

export const requestAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post(API.ADDUSER_URL, data)
  }
}
export const requestAllRoles = (id: number) => {
  return request.get<any, RoleResponseData>(API.ALLROLES_URL + id)
}

export const requestSetRole = (data: SetRoleData) => {
  return request.post<any, any>(API.SETROLE_URL, data)
}

export const requestRemoveUser = (id: number) => {
  return request.delete<any, any>(API.DELETEUSER_URL + id)
}
export const requestRemoveUserList = (data: number[]) => {
  return request.delete<any, any>(API.DELETEUSERLIST_URL, { data: data })
}
