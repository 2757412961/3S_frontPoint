<template>
  <el-form :model="formData" :rules="rules" ref="dataFrom" label-width="100px">
    <el-form-item label="工具名称" prop="name">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="工具地址" prop="url">
      <el-input v-model="formData.url"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="uploadData">立即上传</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
name: "addOnlinetools",
  data() {
    return{
      formData:{
        name:'',
        url:""
      },
      rules:{
        name: [
          { required: true, message: '请输入论文名称', trigger: 'blur' },
        ],
        url: [
          { required: true, message: '请输入文章链接', trigger: 'blur' },
        ],
      }
    }
  },
  methods:{
    uploadData(){
      this.$refs.dataFrom.validate((valid) => {
        if (valid) {
          let that=this;
          let url=that.$URL.uploadOnlinetools;
          let uploadStudentpaperParams = {
            NAME:that.formData.name,
            URL:that.formData.url
          };
          that.$axios.put(url, uploadStudentpaperParams).then(
              res => {
                if (res.code == 200) {
                  that.$message({
                    message: "工具信息上传成功",
                    type: 'success'
                  });
                  that.$refs.dataFrom.resetFields();
                } else {
                  that.$message({
                    message: "工具信息上传失败",
                    type: 'error'
                  });
                }
              }
          );
        }
      });
    }
  },
}
</script>

<style scoped>

</style>