import request from '@/utils/request'
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}
import type { TrademarkResponseData } from './type'

export const requestHasTrademark = (page: number, limit: number) => {
  return request.get<any, TrademarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
}
