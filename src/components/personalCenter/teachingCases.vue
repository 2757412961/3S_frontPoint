<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 90%">
    <el-form-item label="案例名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="案例描述" prop="describe">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" required>
      <el-form-item prop="date">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="关键词" prop="keyword">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="海洋" name="type"></el-checkbox>
        <el-checkbox label="国土" name="type"></el-checkbox>
        <el-checkbox label="测绘" name="type"></el-checkbox>
        <el-checkbox label="气象" name="type"></el-checkbox>
        <el-checkbox label="环境" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="上传团队" prop="GROUP_ID">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="上传作者" prop="AUTHOR_ID">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="作者邮箱" prop="EMAIL">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="" prop="type">
      <el-upload
          class="upload-demo"
          ref="upload"
          action=""
          multiple
          limit="1"
          :http-request="appendFile"
          :file-list="fileList"
          :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传doc文件</div>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">上传案例</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import axios from "../../util/axios";

export default {
  name: "teachingCases",
  data() {
    return {
      fileList: [],
      formData:new FormData(),
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    appendFile(file)
    {
      console.log(this.formData.get('file'));
      this.formData.append('file',file.file);
    },
    submitForm(formName) {
      let that=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //alert('submit!');
          this.formData.append('name',this.ruleForm.name);
          this.$refs.upload.submit();
          axios.post(this.$URL.uploadEduCaseUrl,this.formData,{
            'Content-Type':'multipart/form-data'
          }).then(res=>{
            debugger;
            console.log(res);

            //请求一次后清空之前的表单
            this.formData.delete('file');
          }).catch(err=>{
            debugger;

            console.log(err);
            //请求一次后清空之前的表单
            this.formData.delete('file');
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style scoped>

</style>
