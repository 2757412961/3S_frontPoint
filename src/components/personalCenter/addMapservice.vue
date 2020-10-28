<template>
  <el-form :model="formData" :rules="rules" ref="dataFrom" label-width="150px">
    <el-form-item label="地图服务名称" prop="name">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="地图服务提供方" prop="company">
      <el-input v-model="formData.company"></el-input>
    </el-form-item>
    <el-form-item label="地区" prop="region">
      <el-radio-group v-model="formData.region">
        <el-radio label="CN" value="CN"></el-radio>
        <el-radio label="others" value="other"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="地图服务地址" prop="url">
      <el-input v-model="formData.url"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="uploadData">立即上传</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "addMapservice",
  data() {
    return{
      formData:{
        name:'',
        url:"",
        company:"",
        region:""
      },
      rules:{
        name: [
          { required: true, message: '请输入论文名称', trigger: 'blur' },
        ],
        url: [
          { required: true, message: '请输入文章链接', trigger: 'blur' },
        ],
        company: [
          { required: true, message: '请输入文章链接', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
      }
    }
  },
  methods:{
    uploadData(){
      this.$refs.dataFrom.validate((valid) => {
        if (valid) {
          let that=this;
          let url=that.$URL.uploadMapservice;
          let uploadStudentpaperParams = {
            NAME:that.formData.name,
            URL:that.formData.url,
            COMPANY:that.formData.company,
            REGION:that.formData.region,
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