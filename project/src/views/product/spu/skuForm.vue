<template>
  <el-form :model="skuForm" :rules="rules" ref="skuFormRef" label-width="100px">
    <el-form-item label="SKU名称" prop="skuName">
      <el-input
        v-model="skuForm.skuName"
        placeholder="请输入SKU名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="价格(元)" prop="price">
      <el-input
        v-model="skuForm.price"
        placeholder="请输入SKU的价格"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(g)" prop="weight">
      <el-input v-model="skuForm.weight" placeholder="重量(g)"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述" prop="skuDesc">
      <el-input
        v-model="skuForm.skuDesc"
        type="textarea"
        placeholder="SKU描述"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item
          v-for="attr in attrList"
          :key="attr.id"
          :label="attr.attrName"
          label-width="100px"
        >
          <el-select
            v-model="skuForm.attrSelected[attr.id]"
            placeholder="请选择"
          >
            <el-option
              v-for="value in attr.attrValueList"
              :key="value.id"
              :label="value.valueName"
              :value="`${attr.id}:${value.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item
          :label="item.saleAttrName"
          v-for="item in saleArr"
          :key="item.id"
        >
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              v-for="value in item.spuSaleAttrValueList"
              :key="value.id"
              :label="value.valueName"
              :value="`${item.id}:${value.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr" ref="table">
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column width="80px" label="图片" align="center">
          <template v-slot="scope">
            <img :src="scope.row.imgUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column
          width="80px"
          label="名称"
          align="center"
        ></el-table-column>
        <el-table-column width="80px" label="操作" align="center">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleDefault(scope.row)"
            >
              设置默认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="handleSave">
        保存
      </el-button>
      <el-button type="primary" size="default" @click="handleCancel">
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ElMessage, type FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import type { SkuData, SpuData } from '../../../api/product/spu/type'

//引入请求API
import type { ElTable } from 'element-plus'
import { reqAttr } from '../../../api/product/attr/index'
import type { Attr, AttrResponseData } from '../../../api/product/attr/type'
import {
  reqAddSku,
  reqSpuHasSaleAttr,
  reqSpuImageList,
} from '../../../api/product/spu'
import type {
  SaleAttr,
  SaleAttrResponseData,
  SpuHasImg,
  SpuImg,
} from '../../../api/product/spu/type'

// 定义 emit
const emit = defineEmits(['changeScene'])

// 表单引用
const skuFormRef = ref<FormInstance>()

// 存储平台属性数据
const attrList = ref<Attr[]>([])

const saleArr = ref<SaleAttr[]>([])

//照片的数据
let imgArr = ref<SpuImg[]>([])

const table = ref<InstanceType<typeof ElTable>>()

let skuParams = reactive<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [
    {
      attrId: '',
      valueId: '',
    },
  ],
  skuSaleAttrValueList: [
    {
      saleAttrId: '',
      saleAttrValueId: '',
    },
  ],
  skuDefaultImg: '',
})

// SKU表单数据
const skuForm = reactive({
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuDefaultImg: '',
  attrValueList: [],
  saleAttrValueList: [],
  attrSelected: {}, // 用于收集每个平台属性的选中值
})

// 表单验证规则
const rules = {
  skuName: [{ required: true, message: '请输入SKU名称', trigger: 'blur' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
  weight: [{ required: true, message: '请输入重量', trigger: 'blur' }],
}

// 保存方法
const handleSave = async () => {
  skuParams.skuAttrValueList = attrList.value.reduce(
    (
      prev: { attrId: string; valueId: string }[],
      next: Attr & { attrIdAndValueId?: string },
    ) => {
      if (next.attrIdAndValueId) {
        let [attrId, valueId] = next.attrIdAndValueId.split(':')
        prev.push({
          attrId,
          valueId,
        })
        return prev
      }
      return prev
    },
    [],
  )

  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (
      prev: { saleAttrId: string; saleAttrValueId: string }[],
      next: SaleAttr & { saleIdAndValueId?: string },
    ) => {
      if (next.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
        prev.push({
          saleAttrId,
          saleAttrValueId,
        })
      }
      return prev
    },
    [],
  )

  //添加sku的请求
  const result = await reqAddSku(skuParams)

  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加SKU成功',
    })
    //通知父组件切换场景为0
    emit('changeScene', { flag: 0, params: 'save' })
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败',
    })
  }

  emit('changeScene', { flag: 0, params: 'save' })
}

// 取消方法
const handleCancel = () => {
  emit('changeScene', { flag: 0, params: 'cancel' })
}

const initSkuData = async (c1Id: string, c2Id: string, row: SpuData) => {
  skuParams.category3Id = row.category3Id
  skuParams.spuId = row.id
  skuParams.tmId = row.tmId
  skuParams.skuName = row.spuName
  skuParams.skuDesc = row.description
  // 获取平台属性数据
  try {
    const result: AttrResponseData = await reqAttr(c1Id, c2Id, row.category3Id)

    const result2: SaleAttrResponseData = await reqSpuHasSaleAttr(row.id)
    const result3: SpuHasImg = await reqSpuImageList(row.id)

    if (result.code === 200) {
      attrList.value = result.data
      console.log('平台属性数据:', attrList.value)
    }

    if (result2.code === 200) {
      saleArr.value = result2.data
      console.log('销售属性数据:', result2.data)
    }

    if (result3.code === 200) {
      imgArr.value = result3.data
      console.log('SPU图片数据:', result3.data)
    }
  } catch (error) {
    console.error('获取平台属性失败:', error)
  }
}

const handleDefault = (row: SpuImg) => {
  //复选框选中
  imgArr.value.forEach((item: SpuImg) => {
    table.value?.toggleRowSelection(item, false)
  })

  table.value?.toggleRowSelection(row, true)
  //收集图片地址
  skuParams.skuDefaultImg = row.imgUrl || ''
}

//对外暴露方法
defineExpose({
  initSkuData,
})
</script>

<style scoped lang="scss"></style>
