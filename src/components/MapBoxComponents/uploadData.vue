<!--借助upload组件的功能，实现向服务器上传样例数据-->
<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="35%">
        <el-upload
                class="upload-demo"
                action="http://127.0.0.1:13000/summer/file/temp/datafileSubmit/"
                :before-upload="beforeUpload"
                :before-remove="beforeRemove"
                multiple
                :limit="5"
                :on-exceed="handleExceed"
                :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传json文件</div>
        </el-upload>
    </el-dialog>

</template>

<script>
    import axios from "../../util/axios"
    export default {
        name: "uploadData",
        data() {
            return {
                fileList: [],
                dialogVisible:false,
                title:''

            };
        },
        methods: {
            beforeUpload(file,fileList) {
                //限制上传的数据类型为.json
                let pos=file.name.lastIndexOf('.');
                if(file.name.substr(pos+1,file.name.length)=='json')
                   return true;
                this.$message({
                    message: '请上传json格式数据',
                    type: 'fail'
                });
                return false;
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，
                共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file) {
                axios.get('http://127.0.0.1:13000/summer/file/temp/dataDelete/'+file.name).
                then().catch();
            }
        },
        created() {
            let that=this;
            this.$Bus.$on("uploadDatapara",para=>{
                    that.dialogVisible=para.dialogVisible,
                    that.title=para.title
            })
        }

    }
</script>

<style scoped>

</style>