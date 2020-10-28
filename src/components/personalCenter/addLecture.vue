<template>
  <el-form :model="formData" :rules="rules" ref="dataFrom" label-width="100px">
    <el-form-item label="讲座名称" prop="name">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="uploadData">立即上传</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "addLecture",
  data() {
    return{
      formData:{
        name:'',
      },
      rules:{
        name: [
          { required: true, message: '请输入论文名称', trigger: 'blur' },
        ],
      }
    }
  },
  methods:{
    uploadData(){
      this.$refs.dataFrom.validate((valid) => {
        if (valid) {
          let that=this;
          let url=that.$URL.uploadLecture;
          let uploadStudentpaperParams = {
            name:that.formData.name,
          };
          that.$axios.put(url, uploadStudentpaperParams).then(
              res => {
                if (res.code == 200) {
                  that.$message({
                    message: "讲座上传成功",
                    type: 'success'
                  });
                  that.$refs.dataFrom.resetFields();
                } else {
                  that.$message({
                    message: "讲座上传失败",
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