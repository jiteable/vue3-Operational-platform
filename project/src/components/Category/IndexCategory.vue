<template>
  <el-card>
    <el-form :inline="true" class="category-form">
      <el-form-item label="一级分类" class="form-item">
        <el-select v-model="categoryStore.c1Id" placeholder="请选择分类" @change="handler" class="select-item">
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" class="form-item">
        <el-select v-model="categoryStore.c2Id" placeholder="请选择分类" @change="handler2" class="select-item">
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" class="form-item">
        <el-select v-model="categoryStore.c3Id" placeholder="请选择分类" class="select-item">
          <el-option
            v-for="c3 in categoryStore.c3Arr"
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
import { onMounted } from 'vue'
import useCategoryStore from '../../store/modules/category'

const categoryStore = useCategoryStore()

onMounted(async () => { 
  await categoryStore.getC1()
})

// 一级分类下拉菜单的change事件
const handler = async () => {
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []

  await categoryStore.getC2()
}

// 二级分类下拉菜单的change事件
const handler2 = async () => {
  categoryStore.c3Id = ''
  await categoryStore.getC3()
}


</script>

<style scoped lang="scss">
.category-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  .form-item {
    flex: 1;
    margin-right: 20px;
    
    &:last-child {
      margin-right: 0;
    }
    
    .el-form-item__label {
      width: 80px;
      text-align: right;
    }
    
    .select-item {
      width: 100%;
    }
  }
}
</style>