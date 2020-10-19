<template>
    <div class="pageContent" v-if="tableData">
        <!--表格内容-->
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe style="width: 100%"
        :default-sort = "{prop: 'time', order: 'descending'}" @sort-change="tableSortChange">
            <el-table-column prop="index" type="index" width="40" align="center" :index="indexPageChange"></el-table-column>
            <el-table-column prop="title" label="标题" :sortable="'custom'" header-align="center" align="left"></el-table-column>
            <el-table-column prop="uploader" label="作者" width="150" align="center"></el-table-column>
            <el-table-column prop="userName" label="用户" width="100" align="center"></el-table-column>
            <el-table-column prop="downloadAuthority" label="下载权限" width="100" align="center"></el-table-column>
            <el-table-column prop="downloadTimes" label="下载数量" :sortable="'custom'" width="120" align="center"></el-table-column>
            <el-table-column prop="time" label="时间" :sortable="'custom'" width="180" align="center"></el-table-column>
            <el-table-column prop="type1" label="类型一" width="180" align="center"></el-table-column>
            <el-table-column prop="type2" label="类型二" width="180" align="center"></el-table-column>
            <el-table-column prop="info" label="操作" width="80" align="center">
               <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
               </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination @current-change="paginationCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
            layout="total, prev, pager, next, jumper" :total="tableData.length" align="center">
        </el-pagination>
        <spaceDialog></spaceDialog>
    </div>
</template>

<script>
import spaceDialog from './spaceDialog'
    export default {
        data() {
            return {
                pageSize: 6,
                currentPage: 1
            }
        },
        props: ['tableData'],
        components:{
            spaceDialog
        },
        mounted() {
            this.currentPage=1
        },
        methods:{
            //换页
            paginationCurrentChange(val){
                this.currentPage=val
            },
            //排序
            tableSortChange(column){
                var stringToDate=function(s){
                    return new Date(Date.parse(s.replace(/-/g,"/")))
                }
                let fieldName=column.prop
                let sortType=column.order
                if(fieldName=="title"){
                    if(sortType=="descending"){
                        this.tableData=this.tableData.sort((a, b) => b[fieldName].localeCompare(a[fieldName]))
                    }
                    else{
                        this.tableData=this.tableData.sort((a, b) => a[fieldName].localeCompare(b[fieldName]))
                    }
                }
                else if(fieldName=="downloadTimes"){
                    if(sortType=="descending"){
                        this.tableData=this.tableData.sort((a, b) => b[fieldName] - a[fieldName])
                    }
                    else{
                        this.tableData=this.tableData.sort((a, b) => a[fieldName] - b[fieldName])
                    }
                }
                else{
                    if(sortType=="descending"){
                        this.tableData=this.tableData.sort((a, b) => stringToDate(b[fieldName]) - stringToDate(a[fieldName]))
                    }
                    else{
                        this.tableData=this.tableData.sort((a, b) => stringToDate(a[fieldName]) - stringToDate(b[fieldName]))
                    }
                }
            },
            //分页序号再计算
            indexPageChange(index){
                return index+1+(this.currentPage-1)*this.pageSize
            },
            //点击查看详情，跳转到对应条目信息页
            handleClick(row){
                this.$Bus.$emit('spaceInfo',{
                    spaceData:row,
                    dialogVisible:true
                })
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
