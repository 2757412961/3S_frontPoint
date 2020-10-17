<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="48%"
            v-loading="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
        <!--显示模型的信息，并且提供下载的功能-->
        <el-form label-width="80px">
            <el-form-item v-for="(item,index) in formData" :key="index" :label="index">
               <div><span class="el-form-item__label">{{item}}</span></div>
            </el-form-item>
            <el-form-item label="操作">
                <el-button size="small" type="primary" @click="download">下载模型</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>


</template>

<script>
    import axios from "../../util/axios"
    export default {
        name: "modelInfo",
        data(){
            return{
                title:'更多',
                formData:{},
                dialogVisible:false,
                loading:false
            }
        },
        methods:{
          download()
          {
              let modelname=this.formData['模型名'];
              this.loading=true;
              if(modelname)
              {
                  const instant = axios.create({
                      withCredentials: true,
                      timeout: 600000,
                  });
                  instant.post(this.$platfromUrl.downloadModelUrl+modelname,
                      {
                          //二进制流
                          responseType: 'blob'
                      }).then(res=>{
                          if(res.data.body==='ERROR')
                          {
                              this.$message.warning(res.data.message);
                              this.loading=false;
                              return;
                          }
                          debugger;
                      if (window.navigator && window.navigator.msSaveOrOpenBlob) {

                          let blob = new Blob([res.data], {
                              type: 'application/vnd.ms-excel'
                          })
                          window.navigator.msSaveOrOpenBlob(blob,
                              modelname + '.zip')
                      } else {

                          let blob = new Blob([res.data]);
                          let downloadElement = document.createElement('a');
                          let href = window.URL.createObjectURL(blob);
                          downloadElement.href = href;
                          downloadElement.download = modelname + '.zip';
                          document.body.appendChild(downloadElement);
                          downloadElement.click();
                          document.body.removeChild(downloadElement);
                          window.URL.revokeObjectURL(href);
                      }
                      this.loading=false;
                  }).catch(err=>{
                      debugger;
                      console.log('error');
                      console.log(err.data);


                  })
              }

          }
        },
        created() {
            this.$Bus.$on('modelInfo',params=>{
                this.dialogVisible=params.dialogVisible;
                this.formData=params.formData;
            })
        }
    }
</script>

<style scoped>

</style>