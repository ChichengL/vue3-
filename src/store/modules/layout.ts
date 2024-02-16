import { defineStore } from 'pinia'

const useLayoutStore = defineStore('LayoutStore', {
  state: () => {
    return {
      fold: false,
      refresh: false,
    }
  },
  actions: {
    changeFold() {
      this.fold = !this.fold
    },
  },
})
export default useLayoutStore
