<template>
    <div class="pageContent">
        <!--表格内容-->
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="index" type="index" width="80" align="center" :index="indexPageChange"></el-table-column>
            <el-table-column prop="name" label="名称" width="500" header-align="center" align="left"></el-table-column>
            <el-table-column prop="speaker" label="主讲" width="300" align="center"></el-table-column>
            <el-table-column prop="place" label="地点" width="300" align="center"></el-table-column>
            <el-table-column prop="time" label="时间" align="center"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageSize: 6,
                currentPage: 1
            }
        },
        props: ['tableData'],
        methods:{
            //分页序号再计算
            indexPageChange(index){
                return index+1+(this.currentPage-1)*this.pageSize
            }
        }
    }
</script>

<style>
.pageContent{
    margin-top: 10px;
    margin-left: 30px;
}
</style>
