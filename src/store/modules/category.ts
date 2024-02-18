import { defineStore } from 'pinia'
import { requestC1, requestC2, requestC3 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import { CategoryState } from './type/types'
const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      c1Id: '',
      c2Id: '',
      c2Arr: [],
      c3Id: '',
      c3Arr: [],
    }
  },
  actions: {
    async getc1() {
      const res: CategoryResponseData = await requestC1()
      if (res.code === 200) {
        this.c1Arr = res.data
      }
    },
    async getc2() {
      const res: CategoryResponseData = await requestC2(this.c1Id)
      if (res.code === 200) {
        this.c2Arr = res.data
      }
    },
    async getc3() {
      const res: CategoryResponseData = await requestC3(this.c2Id)
      if (res.code === 200) {
        this.c3Arr = res.data
      }
    },
  },
  getters: {},
})
export default useCategoryStore
