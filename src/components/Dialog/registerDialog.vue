<template>
  <div>
    <el-dialog :visible.sync="registerDialogVisible" @close="closeDialog"
               style="width:100%; padding: 12%; margin: 20px auto;">
      <h2 class="title">注册</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
               style="width: 60%; margin: 10px auto;">
        <el-form-item prop="username" label="用户名">
          <el-input type="text" id="userName" v-model="ruleForm.username" style="width: 60%" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="ruleForm.password" style="width: 60%" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input type="tel" v-model="ruleForm.phone" style="width: 60%" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input type="email" v-model="ruleForm.email" style="width: 60%" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="vericode" label="验证码">
          <el-input type="text" v-model="ruleForm.vericode" style="width: 44%;float:left;margin-left:21.5%"
                    placeholder="请输入验证码"></el-input>
          <el-button type="text" plain :disabled="isAble" style="width: 15%;  float: right"
                     @click="sendVeriCode">{{content}}
          </el-button>
        </el-form-item>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="更多信息">
            <el-form-item prop="country" label="国家(地区)">
              <el-select v-model="selectedCountry" style="width: 60%" placeholder="请选择国家(地区)">
                <el-option
                    v-for="item in countryOptions"
                    :key="item.short"
                    :label="item.name"
                    :value="item.name">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.short }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="instituteType" label="机构类型">
              <el-select v-model="selectedType" style="width: 60%" placeholder="请选择机构类型">
                <el-option
                    v-for="item in instituteOptions"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="institute" label="机构">
              <el-input type="text" v-model="ruleForm.institute" style="width: 60%" placeholder="请输入机构名称"></el-input>
            </el-form-item>
            <el-form-item prop="field" label="专业领域">
              <el-select v-model="selectedField" style="width: 60%" placeholder="请选择专业领域">
                <el-option
                    v-for="item in fieldOptions"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="purpose" label="用途">
              <el-select v-model="selectedPurpose" style="width: 60%" placeholder="请选择用途">
                <el-option
                    v-for="item in purposeOptions"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
        <br>
        <el-form-item>
          <el-button style="width:37%; float: left" @click="cancel">重置</el-button>
          <el-button type="primary" style="width:37%; float:right" @click.native.prevent="register"
                     :loading="registering">确定
          </el-button>

        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import countryOps from '../../../static/json/country.json'

export default {
  name: "registerDialog",
  data() {
    return {
      content: '发送',
      totalTime: 60,
      registerDialogVisible: false,
      registering: false,
      isAble: false,
      countryOptions: [],
      selectedCountry: '',
      instituteOptions: [
        {index: '1', value: '政府'},
        {index: '2', value: '大学'},
        {index: '3', value: '企业'},
        {index: '4', value: '个人'}
      ],
      selectedType: '',
      fieldOptions: [
        {index: '1', value: '地理学类'},
        {index: '2', value: '信息学类'},
        {index: '3', value: '其他学科'}
      ],
      selectedField: '',
      purposeOptions: [
        {index: '1', value: '学习'},
        {index: '2', value: '商业'},
        {index: '3', value: '其他'}
      ],
      selectedPurpose: '',
      ruleForm: {
        username: '',
        password: '',
        phone: '',
        email: '',
        institute: '',
        instituteType:'',
        country:'',
        vericode: '',
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          // {
          //   validator: function (rule, value, callback) {
          //     if (value === '') {
          //       callback(new Error('请正确填写邮箱'));
          //     } else {
          //       if (value !== '') {
          //         var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          //         if (!reg.test(value)) {
          //           callback(new Error('请输入有效的邮箱'));
          //         }
          //       } else {
          //         callback();
          //       }
          //     }
          //   }, trigger: 'blur'
          // }
        ],
        vericode: [],
        country:[],

      },
      correctCode: '',
    };
  },
  methods: {
    cancel() {
      this.$refs.ruleForm.resetFields();

    },
    closeDialog() {
      this.registerDialogVisible = false;
      this.$refs.ruleForm.resetFields();
      this.ruleForm.vericode='';
      this.selectedField='请选择专业领域';
    },


    sendVeriCode() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let that = this;
          let userName=document.getElementById('userName').value
          let userSearchURL = that.$URL.searchUsersByName + userName
          that.$axios.get(userSearchURL, "").then(
              res => {
                if (res.code === 200) {
                  that.$message({
                    message: "该用户名已存在",
                    type: 'success'//类型是接口规定好的么？如果是应该改成succes
                  });
                }//判断用户名是否重复
                else {
                  that.$axios.get(that.$URL.check + that.ruleForm.email).then(
                      // function (res) {//这边还需要加一个发送失败的else分支给出提示
                      res => {
                        if (res.code === 200) {
                          that.$message({
                            message: "已向该账户绑定的邮箱发送验证邮件，请查收",
                            type: 'success'
                          });

                          that.content = that.totalTime + 's' //这里解决60秒不见了的问题
                          let clock = window.setInterval(() => {
                            that.totalTime--
                            that.content = that.totalTime + 's'
                            that.isAble = true;
                            if (that.totalTime < 0) {     //当倒计时小于0时清除定时器
                              window.clearInterval(clock)
                              that.content = '重发'
                              that.totalTime = 60
                              that.isAble = false;
                            }
                          }, 1000)
                          that.correctCode = res.body.code;//这里有错误，body值为code和email
                          console.log(res.body.code)
                          debugger;
                        } else {
                          that.$message({
                            message: "发送失败",
                            type: 'false'
                          });
                        }
                      }
                  );
                }
              }
          )
        }
      })
    },

    register() {
      console.log(this.ruleForm.vericode)
      debugger;
      if (this.ruleForm.vericode === this.correctCode) {
        this.$md5('holle') //     密码加密
        this.registering = true;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            debugger;
            let that = this;
            let url = that.$URL.addUser;
            let registerParams = {
              name: that.ruleForm.username,
              password: that.ruleForm.password,
              phone: that.ruleForm.phone,
              email: that.ruleForm.email,
              country: that.selectedCountry,
              institutetype: that.selectedType,
              institute: that.ruleForm.institute,
              field: that.selectedField,
              purpose: that.selectedPurpose,
              role: "user"
            };


            that.$axios.put(url, registerParams).then(
                res => {
                  if (res.code === 200) {
                    debugger;
                    that.$message({
                      message: "用户注册成功",
                      type: 'success'
                    });
                    that.$refs.ruleForm.resetFields();
                    that.registering = false;
                    that.registerDialogVisible = false;
                    sessionStorage.setItem('user', JSON.stringify(res.body));
                  } else {
                    debugger;
                    that.$message({
                      message: "用户注册失败",
                      type: 'error'
                    });
                    that.$refs.ruleForm.resetFields();
                    that.registering = false;
                  }
                }
            );
          }
        });
      } else {
        this.$message({
          message: "验证码错误，请重新确认",
          type: 'error'
        });
        this.ruleForm.vericode = '';
      }
    },

  },
  created() {
    this.$Bus.$on('showRegister', () => {
      this.registerDialogVisible = true;
    })
    this.countryOptions = countryOps.country;
  },

}
</script>

<style scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 160px auto;
  width: 360px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #605458;
}

.remember {
  margin: 0px 0px 35px 0px;
}

.dialogTitle {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #605458;
}

.el-form-item {
  margin-bottom: 30px;
}

.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 240px;
  float: right;
}

.el-select {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 240px;
  float: right;
}

.el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 31%;
}
</style>