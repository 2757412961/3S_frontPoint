<template>
    <el-dialog
            title="注册模型"
            :visible.sync="dialogVisible"
            width="30%">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="权限选择">
                <el-radio-group v-model="form.isPublic">
                    <el-radio label="公有" :style="{paddingTop:'5%'}"></el-radio>
                    <el-radio label="私有" :style="{paddingTop:'5%'}"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="模型文件">
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
                    <div slot="tip" class="el-upload__tip">请上传注册模型所需的xml、jar、png/jpg文件，所有文件需符合格式要求</div>

                </el-upload>
            </el-form-item>
        </el-form>
        <div style="margin: 1%"></div>
        <el-button style="position:relative;left:70%" size="small" type="success" @click="submitUpload">注册模型</el-button>
    </el-dialog>
</template>

<script>
    import axios from "../../util/axios"
    export default {
        name: "modelUpload",
        data(){
            return{
                dialogVisible:false,
                fileList:[],
                formData:new FormData(),
                form:{
                    isPublic:'公有'
                }
            }
        },
        methods:{
          submitUpload()
          {
              let that=this;
              if(this.form.isPublic==='公有')
              {
                  this.formData.append('isPublic','true');
              }
              else
              {
                  this.formData.append('isPublic','false');
              }
              this.$refs.upload.submit();

                  axios.post(this.$platfromUrl.registerModelUrl,this.formData,{
                      'Content-Type':'multipart/form-data'
                  }).then(res=>{
                      debugger;
                      console.log(res);
                      if(res.data.code===200)
                      {
                          this.$message.success('模型注册成功')
                      }
                      else if(res.data.code===9002)
                      {
                          this.$message.error('该模型已注册，请勿重复注册');
                      }
                      else
                      {
                          this.$message.error('模型注册失败，您的输入与上传文件要求不符');
                      }
                      //请求一次后清空之前的表单
                      this.formData.delete('file');
                  }).catch(err=>{
                      debugger;

                      console.log(err);
                      //请求一次后清空之前的表单
                      this.formData.delete('file');
                  })


          },
          handleRes(res,file,fileList)
          {
              debugger;
              console.log(res,file,fileList);
          },
          appendFile(file)
          {
              console.log(this.formData.get('file'));
              this.formData.append('file',file.file);
          }
        },
        created() {
            let that=this;
            this.$Bus.$on('modelUpload',params=>{
                that.dialogVisible=params.dialogVisible;
            })
        }
    }
</script>

<style scoped>

</style>