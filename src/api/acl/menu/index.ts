import request from '@/utils/request'
import { Params, responsePermissionData } from './type'
enum API {
  ALLPERMISSION_URL = '/admin/acl/permission',
  ADDPERMISSION_URL = '/admin/acl/permission/save',
  UPDATEPERMISSION_URL = '/admin/acl/permission/update',
  DELETEPERMISSION_URL = '/admin/acl/permission/remove/',
}

export const requestAllPermission = () => {
  return request.get<any, responsePermissionData>(API.ALLPERMISSION_URL)
}

export const requestAddOrUpdatePermission = (data: Params) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEPERMISSION_URL, data)
  } else {
    return request.post<any, any>(API.ADDPERMISSION_URL, data)
  }
}

export const requestDeletePermission = (id: number) => {
  return request.delete<any, any>(API.DELETEPERMISSION_URL + id)
}
