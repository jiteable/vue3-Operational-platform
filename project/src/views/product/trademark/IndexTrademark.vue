<template>
    <div>
        <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
        <!--表格组件:展示已有平台数据-->
        <el-table style="margin: 10px 0px;" border>
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="品牌名称"></el-table-column>
            <el-table-column label="品牌LOGO"></el-table-column>
            <el-table-column label="操作"></el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
</style>