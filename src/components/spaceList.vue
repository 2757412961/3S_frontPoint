<template>
    <div class="pageContent">
        <!--表格内容-->
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="index" type="index" width="40" align="center" :index="indexPageChange"></el-table-column>
            <el-table-column prop="title" label="标题" header-align="center" align="left"></el-table-column>
            <el-table-column prop="uploader" label="作者" width="150" align="center"></el-table-column>
            <el-table-column prop="userName" label="用户" width="100" align="center"></el-table-column>
            <el-table-column prop="downloadAuthority" label="下载权限" width="100" align="center"></el-table-column>
            <el-table-column prop="downloadTimes" label="下载数量" width="120" align="center"></el-table-column>
            <el-table-column prop="time" label="时间" width="180" align="center"></el-table-column>
            <el-table-column prop="type1" label="类型一" width="180" align="center"></el-table-column>
            <el-table-column prop="type2" label="类型二" width="180" align="center"></el-table-column>
            <el-table-column prop="info" label="操作" width="80" align="center">
               <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
               </template>
            </el-table-column>
        </el-table>
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
