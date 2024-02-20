export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface Data {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}
export interface CategoryResponseData extends ResponseData {
  data: Data[]
}
//属性值
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
}
export type AttrValueList = AttrValue[]
// 属性对象
export interface Attr {
  id?: number
  attrName: string
  categoryId?: number | string
  categoryLevel: number
  attrValueList: AttrValue[]
}
export type AttrList = Attr[]

//属性接口返回类型
export interface AttrResponseData extends ResponseData {
  data: AttrList
}
