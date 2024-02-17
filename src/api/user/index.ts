//用户相关
import request from '@/utils/request'
import type { loginForm, loginResponseData, userInfoResponseData } from './type'

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
export const requestLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
export const requestUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)
export const requestLogout = () => request.post<any, any>(API.LOGOUT_URL)
