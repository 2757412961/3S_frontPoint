<template>
    <el-dialog :visible.sync="dialogVisible">
        <el-form ref="form" :model="form">
            <el-form-item label="请输入您想要创建的文件名">
                <el-input v-model="form.name"></el-input>
                <el-button @click="makeDir">确定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    
</template>

<script>
    export default {
        name: "userMkdir",
        data()
        {
            return {
                dialogVisible:false,
                form:{
                    name:''
                }
            }
        },
        methods:{
            makeDir()
            {
                this.$emit('makeDir',this.form.name);
            }
        },
        created() {
            let that=this;
            this.$Bus.$on('userMkdir',p=>{
                debugger;
                that.dialogVisible=true
            })
        }

    }
</script>

<style scoped>

</style>