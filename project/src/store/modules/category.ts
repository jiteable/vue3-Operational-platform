//商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '../../api/product/attr/index'
import type { CategoryObj } from '../../api/product/attr/type'
import type { CategoryState } from './type/type'

const useCategoryStore = defineStore('category', {
  state: (): CategoryState => {
    return {
      //一级分类的数据
      c1Arr: [] as CategoryObj[],
      //一级分类的ID
      c1Id: '',
      c2Arr: [] as CategoryObj[],
      c2Id: '',
      c3Arr: [] as CategoryObj[],
      c3Id: '',
    }
  },
  actions: {
    async getC1() {
      const result = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },
    async getC2() {
      const result = await reqC2(this.c1Id)
      if (result.code === 200) {
        this.c2Arr = result.data
      }
    },
    async getC3() {
      const result = await reqC3(this.c2Id)
      if (result.code === 200) {
        this.c3Arr = result.data
      }
    },
  },
  getters: {
    // Add any getters here if needed
  },
})

export default useCategoryStore