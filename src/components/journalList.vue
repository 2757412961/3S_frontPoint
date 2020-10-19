<template>
    <div class="pageContent">
        <!--表格内容-->
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="index" type="index" width="80" align="center" :index="indexPageChange"></el-table-column>
            <el-table-column prop="title" label="标题" header-align="center" align="left"></el-table-column>
            <el-table-column prop="author" label="作者" width="200" align="center"></el-table-column>
            <el-table-column prop="sourceName" label="来源" width="150" align="center"></el-table-column>
            <el-table-column prop="year" label="发表年份" width="160" align="center"></el-table-column>
            <el-table-column prop="type" label="文章类型" width="100" align="center"></el-table-column>
            <el-table-column prop="info" label="操作" width="80" align="center">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <journalDialog></journalDialog>
    </div>
</template>

<script>
    import journalDialog from "./journalDialog";
    export default {
        data() {
            return {
                pageSize: 6,
                currentPage: 1
            }
        },
        props: ['tableData'],
        components:{
            journalDialog
        },
        methods:{
            //分页序号再计算
            indexPageChange(index){
                return index+1+(this.currentPage-1)*this.pageSize
            },
            //点击查看详情，跳转到对应条目信息页
            handleClick(row){
                this.$Bus.$emit('journalInfo',{
                    journalData:row,
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
