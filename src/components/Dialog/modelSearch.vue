<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="48%">
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="name"
                    label="模型名"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="usage"
                    label="用途"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="isPublic"
                    label="权限"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="描述"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <span @click="deleteModel(scope.$index,scope.row)"><i class="el-icon-remove"></i></span>
                    <span @click="moreInfo(scope.row)"><i class="el-icon-info"></i></span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model="pager"
                       :page-size="20"
                       :pager-count="5"
                       layout="prev, pager, next"
                       :total="mytotal"
                       style="margin-top: 10px;margin-left: 50%"
                       @current-change="ChangePage">
        </el-pagination>
    </el-dialog>
</template>

<script>
    import axios from "../../util/axios";

    export default {
        name: "modelSearch",
        data(){
            return {
                pager:'',
                mytotal:0,
                keywords:'',
                dialogVisible:false,
                tableData:[],
                title:'搜索结果'
            }
        },
        methods:{
            ChangePage(currentPage)
            {
                let that=this;
                axios.get(this.$platfromUrl.searchModelUrl,{
                    params:{
                        keywords:this.keywords,
                        pageNo:currentPage,
                        pageSize:20
                    }
                }).then(res=>{
                    debugger;
                    let re=res.data.body;
                    let mlist=re.result;
                    let table=[];
                    for(let i=0;i<mlist.length;i++)
                    {
                        let pub='私有';
                        if(mlist[i].isPublic) pub='公有';
                        table.push({'name':mlist[i].artifactId,'usage':mlist[i].usages,'isPublic':pub,'description':mlist[i].keywords});
                    }
                    this.tableData=table;
                }).catch(err=>{})
            },
            deleteModel(index,row)
           {
               debugger;
               console.log(row.name);
               axios.delete(this.$platfromUrl.deleteModelUrl+row.name).then(res=>{
                   //删除当前行
                   debugger;
                   if(res.data.code==200)
                   {
                       debugger;
                       this.tableData.splice(index,1);
                       //删除的同时需要刷新模型管理界面
                       this.$emit('modelRefresh');
                       this.$message.success('模型删除成功');
                   }
                   else
                   {
                       this.$message.error(res.data.message)
                   }

                   console.log(res);
               }).catch(err=>{
                   debugger;
                   console.log(err);
               })
           },
            moreInfo(row)
            {
                //this.dialogVisible=false;
                debugger;
                //window.open的方式会被拦截
                //window.open('http://192.168.1.5:13000/summer/parallel/download/Clip');
                this.$emit('modelInfo',row.name)
            }
        },
        created() {
            this.$Bus.$on('modelSearch',params=>{
                this.tableData.splice(0,this.tableData.length);
                for(let i=0;i<params.tableData.length;i++)
                this.tableData.push(params.tableData[i]);
                this.dialogVisible=params.dialogVisible;
                this.keywords=params.keywords;
                this.mytotal=params.totalCount;
            })
        }
    }
</script>

<style scoped>

</style>