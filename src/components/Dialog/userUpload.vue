<template>
    <el-dialog :visible.sync="dialogVisible">
        <el-upload
                class="upload-demo"
                ref="upload"
                action=""
                multiple
                :http-request="appendFile"
                :file-list="fileList"
                :auto-upload="false"
                :on-success="handleRes">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button size="small" type="success" @click="submitUpload">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">请上传注册模型所需的xml、jar、png/jpg文件，所有文件需符合格式要求</div>
        </el-upload>
    </el-dialog>
</template>

<script>
    import axios from "../../util/axios";

    export default {
        name: "userUpload",
        data()
        {
            return{
                fileList:[],
                dialogVisible:false,
                formData:new FormData(),
                data:{}
            }
        },
        methods:{
            handleRes(res,file,fileList)
            {
                debugger;
                console.log(res,file,fileList);
            },
            appendFile(file)
            {

                this.formData.append('file',file.file);
                console.log(this.formData.get('file'));
            },
            submitUpload()
            {
                this.formData.append('path',this.data.path);
                this.$refs.upload.submit();
                this.$axios.postAdvanced(this.$URL.userSpaceUpload,this.formData,{
                    'Content-Type':'multipart/form-data'
                }).then(res=>{
                    debugger;

                }).catch(err=>{
                    debugger;

                    console.log(err);
                    //请求一次后清空之前的表单
                    this.formData.delete('file');
                })


            },
        },
        created() {
            let that=this;
            this.$Bus.$on('userUpload',p=>{
                that.dialogVisible=true;
                debugger;
                that.data=p;
            })
        }
    }
</script>

<style scoped>

</style>