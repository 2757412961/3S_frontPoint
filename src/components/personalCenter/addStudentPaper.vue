<template>
  <el-form :model="formData" :rules="rules" ref="dataFrom" label-width="100px">
    <el-form-item label="论文名称" prop="title">
      <el-input v-model="formData.title"></el-input>
    </el-form-item>
    <el-form-item label="英文名称" prop="titleEN">
      <el-input v-model="formData.titleEN"></el-input>
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-input v-model="formData.author"></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-input v-model="formData.type"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="uploadData">立即上传</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "addStudentPaper",
  data() {
    return{
      formData:{
        title:'',
        titleEN:'',
        author:'',
        type:""
      },
      rules:{
        title: [
          { required: true, message: '请输入论文名称', trigger: 'blur' },
        ],
        titleEN: [
          { required: true, message: '请输入论文英文名称', trigger: 'blur' },
        ],
        author: [
          { required: true, message: '请输入论文作者', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请输入类型', trigger: 'blur' },
        ],
      }
    }
  },
  methods:{
    uploadData(){
      this.$refs.dataFrom.validate((valid) => {
        if (valid) {
          let that=this;
          let url=that.$URL.uploadStudentpaper;
          let uploadStudentpaperParams = {
            title:that.formData.title,
            englishTitle:that.formData.titleEN,
            author:that.formData.author,
            type:that.formData.type
          };
          that.$axios.put(url, uploadStudentpaperParams).then(
              res => {
                if (res.code == 200) {
                  that.$message({
                    message: "学生论文上传成功",
                    type: 'success'
                  });
                  that.$refs.dataFrom.resetFields();
                } else {
                  that.$message({
                    message: "学生论文上传失败",
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