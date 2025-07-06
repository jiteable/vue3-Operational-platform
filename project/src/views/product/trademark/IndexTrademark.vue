<template>
    <div>
      <el-card class="box-card">
            <!-- 卡片顶部添加品牌按钮 -->
            <el-button type="primary" size="default" icon="Plus" @click="addTrademark" v-has="`btn.Trademark.add`">添加品牌</el-button>
            <!-- 表格组件：用于展示已有得平台数据 -->
            <!-- table:---border:可以设置表格纵向是否有边框
                table-column:---label:某一个列表 ---width:设置这列宽度 ---align:设置这一列对齐方式    
            -->
            <el-table style="margin:10px 0px" border :data="trademarkArr">
                <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                <!-- table-column:默认展示数据用div -->
                <el-table-column label="品牌名称" prop="tmName">
                </el-table-column>
                <el-table-column label="品牌LOGO">
                    <template #="{ row, $index }">
                        <img :src="row.logoUrl" style="width:100px;height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                        <el-popconfirm :title="`您确定要删除${row.tmName}?`" width="250px" icon="Delete"
                            @confirm='removeTradeMark(row.id)'>
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器组件
                pagination
                   v-model:current-page:设置分页器当前页码
                   v-model:page-size:设置每一个展示数据条数
                   page-sizes:用于设置下拉菜单数据
                   background:设置分页器按钮的背景颜色
                   layout:可以设置分页器六个子组件布局调整
            -->
            <el-pagination @size-change="sizeChange" @current-change="getHasTrademark" :pager-count="9"
                v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
                layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
        </el-card>




    </div>
</template>

<script lang="ts" setup>

//引入组合式API函数ref
import { onMounted, ref } from 'vue';
import { reqHasTrademark } from '../../../api/product/trademark';
import type { Records } from '../../../api/product/trademark/type';

//当前页码
let pageNo = ref<number>(1);
//每一页展示多少条数据
let limit = ref<number>(3);
//存储已有品牌数据总数
let total = ref<number>(0);
//存储已有品牌的数据
let trademarkArr = ref<Records>([]);

const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result = await reqHasTrademark(pageNo.value, limit.value);
  if (result.code == 200) {
    trademarkArr.value = result.data.records;
    total.value = result.data.total;
  }
}

//控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false)
//定义收集新增品牌数据

//获取已有品牌的接口封装为一个函数:在任何情况下向获取数据,调用次函数即可

//组件挂载完毕钩子---发一次请求,获取第一页、一页三个已有品牌数据
onMounted(() => {
    getHasTrademark()
})


// const changePage = () => {
//     getHasTrademark()
// }

const sizeChange = () => {
    getHasTrademark()
}


</script>

<style scoped lang="scss">
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>