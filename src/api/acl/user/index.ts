import request from '@/utils/request'
import type { UserResponseDate } from './type'
enum API {
  ALLUSER_URL = '/admin/acl/user/',
}
export const requestUsers = (page: number, limit: number) => {
  return request.get<any, UserResponseDate>(
    API.ALLUSER_URL + page + '/' + limit,
  )
}
