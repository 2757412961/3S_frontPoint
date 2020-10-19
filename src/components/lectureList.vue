<template>
    <div class="pageContent" v-if="tableData">
        <!--表格内容-->
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe style="width: 100%"
        :default-sort = "{prop: 'name', order: 'descending'}" @sort-change="tableSortChange">
            <el-table-column prop="index" type="index" width="80" align="center" :index="indexPageChange"></el-table-column>
            <el-table-column prop="name" label="名称" width="500" :sortable="'custom'" header-align="center" align="left"></el-table-column>
            <el-table-column prop="speaker" label="主讲" width="300" align="center"></el-table-column>
            <el-table-column prop="place" label="地点" width="300" align="center"></el-table-column>
            <el-table-column prop="time" label="时间" align="center"></el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination @current-change="paginationCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
            layout="total, prev, pager, next, jumper" :total="tableData.length" align="center">
        </el-pagination>
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
            //换页
            paginationCurrentChange(val){
                this.currentPage=val
            },
            //排序
            tableSortChange(column){
                let fieldName=column.prop
                let sortType=column.order
                if(fieldName=="name"){
                    if(sortType=="descending"){
                        this.tableData=this.tableData.sort((a, b) => b[fieldName].localeCompare(a[fieldName]))
                    }
                    else{
                        this.tableData=this.tableData.sort((a, b) => a[fieldName].localeCompare(b[fieldName]))
                    }
                }
            },
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
