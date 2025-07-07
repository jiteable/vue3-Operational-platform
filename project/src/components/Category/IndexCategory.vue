<template>
  <el-card>
    <el-form>
      <el-form-item label="一级分类">
        <el-select v-model="category1Id" placeholder="请选择分类">
          <el-option
            v-for="(c1,index) in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="category2Id" placeholder="请选择分类">
          <el-option
            v-for="(c2,index) in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="category3Id" placeholder="请选择分类">
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
import { reqC1, reqC2, reqC3 } from '../../api/product/attr/index'
import { onMounted, ref } from 'vue'
import useCategoryStore from '../../store/modules/category'

const categoryStore = useCategoryStore()
const category1Id = ref<number>(0)
const category2Id = ref<number>(0)
const category3Id = ref<number>(0)

const category1Arr = ref([])
const category2Arr = ref([])
const category3Arr = ref([])

onMounted(async () => { 
  getCategory1()
})

const getCategory1 = async () => {
  const result = await reqC1()
  console.log(result)
}

const getCategory2 = async () => {
  const result = await reqC2(category1Id.value)
  console.log(result)
}

const getCategory3 = async () => {
  const result = await reqC3(category2Id.value)
  console.log(result)
}

</script>

<style scoped lang="scss">
</style>