<template>
    <div>
        <!-- 三级分类 -->
        <Category></Category>
        <el-card style="margin:10px 0px">
            <!-- v-if|v-show:都可以实现显示与隐藏 -->
            <div v-show="scene == 0">
                <el-button
                    @click="addSpu"
                    type="primary"
                    size="default"
                    icon="Plus"
                    :disabled="categoryStore.c3Id ? false : true"
                >添加SPU</el-button>
                <!-- 展示已有SPU数据 -->
                <el-table style="margin: 10px 0px;" border :data="records">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                    <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                    <el-table-column label="SPU操作">
                        <!-- row:即为已有的SPU对象 -->
                        <template v-slot="{ row }">
                            <el-button
                                type="primary"
                                size="small"
                                icon="Plus"
                                title="添加SKU"
                                @click="addSku(row)"
                            ></el-button>
                            <el-button
                                type="primary"
                                size="small"
                                icon="Edit"
                                title="修改SPU"
                                @click="updateSpu(row)"
                            ></el-button>
                            <el-button
                                type="primary"
                                size="small"
                                icon="View"
                                title="查看SKU列表"
                                @click="findSku(row)"
                            ></el-button>
                            <el-popconfirm
                                :title="`你确定删除${row.spuName}?`"
                                width="200px"
                                @confirm="deleteSpu(row)"
                            >
                                <template #reference>
                                    <el-button
                                        type="primary"
                                        size="small"
                                        icon="Delete"
                                        title="删除SPU"
                                    ></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination
                    v-model:current-page="pageNo"
                    v-model:page-size="pageSize"
                    :page-sizes="[3, 5, 7, 9]"
                    :background="true"
                    layout="prev, pager, next, jumper,->,sizes,total"
                    :total="total"
                    @current-change="getHasSpu"
                    @size-change="changeSize"
                />
            </div>
            <!-- 添加SPU|修改SPU子组件 -->
            <SpuForm ref="spu" v-show="scene == 1" @changeScene="changeScene">            </SpuForm>
            <!-- 添加SKU的子组件 -->
            <SkuForm ref="sku" v-show="scene == 2" @changeScene="changeScene"></SkuForm>
            <!-- dialog对话框:展示已有的SKU数据 -->
            <el-dialog v-model="show" title="SKU列表">
                <el-table border :data="skuArr">
                    <el-table-column label="SKU名字" prop="skuName"></el-table-column>
                    <el-table-column label="SKU价格" prop="price"></el-table-column>
                    <el-table-column label="SKU重量" prop="weight"></el-table-column>
                    <el-table-column label="SKU图片">
                        <template v-slot="{ row }">
                            <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;" />
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>


<script setup lang="ts">
import type { HasSpuResponseData,Records  } from '../../../api/product/spu/type'
import { ref, watch } from 'vue'
import { reqHasSpu } from '../../../api/product/spu'
import useCategoryStore from '../../../store/modules/category'

const scene = ref<number>(0)
const categoryStore = useCategoryStore()

let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
//存储已有的SPU的数据
let records = ref<Records>([])
let skuArr = ref<any[]>([])
let show = ref<boolean>(false)

watch(() => categoryStore.c3Id, () => { 
    //务必保证有三级分类ID
    if(!categoryStore.c3Id) return
    getHasSpu()
})

//获取三级分类下的已有的SPU数据
const getHasSpu = async () => {
    const res: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
    if (res.code == 200) {
        records.value = res.data.records
        total.value = res.data.total
    }
}

const addSpu = async () => {

}

const addSku = async (row) => {

}

const findSku = async (row) => {

}

const deleteSpu = async (row) => {

}

const updateSpu = async (row) => {

}

</script>

<style scoped lang="scss">
</style>