import request from '@/utils/request'
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}
import type { Trademark, TrademarkResponseData } from './type'

export const requestHasTrademark = (page: number, limit: number) => {
  return request.get<any, TrademarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
}

export const requestUpdateOrAddTrademark = (data: Trademark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

export const requestDeleteTrademark = (id: number) => {
  return request.delete<any, any>(API.DELETETRADEMARK_URL + id)
}
