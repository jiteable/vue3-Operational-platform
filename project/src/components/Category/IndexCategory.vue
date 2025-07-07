<template>
  <el-card>
    <el-form>
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id" placeholder="请选择分类" @change="handler">
          <el-option
            v-for="(c1,index) in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2Id" placeholder="请选择分类" @change="handler2">
          <el-option
            v-for="(c2,index) in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" placeholder="请选择分类">
          <el-option
            v-for="(c3,index) in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted} from 'vue'
import useCategoryStore from '../../store/modules/category'

const categoryStore = useCategoryStore()

onMounted(async () => { 
  getCategory1()
})

const getCategory1 = async () => {

}

// 一级分类下拉菜单的change事件
const handler = () => {
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []

  categoryStore.getC2()
}

// 二级分类下拉菜单的change事件
const handler2 = () => {
  categoryStore.c3Id = ''
  categoryStore.getC3()
}


</script>

<style scoped lang="scss">
</style>