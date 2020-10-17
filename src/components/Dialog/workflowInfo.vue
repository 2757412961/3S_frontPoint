<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="23%">
        <!--显示模型的信息，并且提供下载的功能-->
        <el-form label-position="left" label-width="100px">
            <el-form-item v-for="(item,index) in formData" :key="index" :label="index">
                <div><span class="el-form-item__label">{{item}}</span></div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    export default {
        name: "workflowInfo",
        data(){
            return{
                title:'工作流信息',
                dialogVisible:false,
                formData:[]
            }
        },
        created() {
            let that=this;
            this.$Bus.$on('workflowInfo',params=>{
                that.dialogVisible=params.dialogVisible;
                that.formData=params.formData
            })
        }
    }
</script>

<style scoped>

</style>