<template>
  <el-dialog :visible.sync="loginDialogVisible" @close="closeDialog"
             style="width:840px; margin: 20px auto;">
    <h2 class="title">登录</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
             style="width: 90%; margin: 0px auto;">
      <!--class="demo-ruleForm login-container">-->
      <el-form-item prop="username" label="用户名">
        <el-input type="text" v-model="ruleForm.username" auto-complete="on" width="100%"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off" width="100%"></el-input>
      </el-form-item>
      <!--<el-checkbox v-model="checked"  class="remember">记住密码</el-checkbox>-->
      <el-form-item>
        <el-button style="width:47%; float: left" @click="cancel">重置</el-button>
        <el-button type="primary" style="width:47%; float:right" @click.native.prevent="login"
                   :loading="logining">确定
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="text" style="float: left" @click="showVerifyDialog">忘记密码</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import verifyDialog from "./verifyDialog"

export default {
  name: "loginDialog",
  components: {
    verifyDialog,
  },
  data() {
    return {
      loginDialogVisible: false,
      logining: false,
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
        ]
      },
    };
  },
  methods: {
    cancel() {
      this.$refs.ruleForm.resetFields();
    },
    showVerifyDialog() {
      this.$Bus.$emit('showVerify');
    },
    closeDialog() {
      this.loginDialogVisible = false;
      this.$refs.ruleForm.resetFields();
    },
    login() {
      this.logining = true;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let that=this;
          let loginParams = {name: that.ruleForm.username, password: that.ruleForm.password};
          that.$axios.post(that.$URL.userLogin, loginParams).then(
              res => {
                if (res.code == 200) {
                  that.$message({
                    message: "用户登录成功",
                    type: 'success'
                  });
                  that.$refs.ruleForm.resetFields();
                  that.logining = false;
                  that.loginDialogVisible = false;
                  sessionStorage.setItem('user', JSON.stringify(res.body));
                  //刷新页面，重新判断几个按钮的显示隐藏
                  this.$store.commit('setUsername',JSON.parse(sessionStorage.user).name)
                  this.$store.commit('setRole',JSON.parse(sessionStorage.user).role)
                  console.log(this.$store.getters.role)
                  this.$router.go({path: '/index'});
                  // if(this.$store.getters.role=='visitor'){
                  //   console.log(this.$store.getters.role)
                  //   document.getElementById("personalcenter").style.display='none'
                  //   document.getElementById("login").style.display='block'
                  //   document.getElementById("signin").style.display='block'
                  // }
                  // else {
                  //   console.log(this.$store.getters.role)
                  //   document.getElementById("personalcenter").style.display='block'
                  //   document.getElementById("login").style.display='none'
                  //   document.getElementById("signin").style.display='none'
                  // }
                } else if (res.code == 1001) {
                  // that.$forceUpdate();
                  that.$message({
                    message: "用户名或密码错误",
                    type: 'warning'
                  });
                  that.$refs.ruleForm.resetFields();
                  that.logining = false;
                } else if (res.code == 1002) {
                  that.$refs.ruleForm.resetFields();
                  that.$message({
                    message: "该用户不存在",
                    type: 'error'
                  });
                  that.logining = false;
                }
              }
          );
        }
      });
    },
    objKeySort(obj) {
      //排序的函数
      var newkey = Object.keys(obj).sort();
      //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
      var newObj = "";//创建一个新的字符串，用于存放排好序的键值对
      for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
        obj[newkey[i]] = JSON.stringify(obj[newkey[i]]);
        //向新创建的对象中按照排好的顺序依次增加键值对
        newObj += ((newObj.indexOf("=") != -1) ? "&" : "") + newkey[i] + "=" + obj[newkey[i]];
      }
      return newObj;//返回排好序的
    }
  },
  created() {
    this.$Bus.$on('showLogin', () => {
      this.loginDialogVisible = true;
    })
  }
}
</script>

<style scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #505458;
}

.remember {
  margin: 0px 0px 35px 0px;
}

.dialogTitle {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #505458;
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

.el-form-item__error {
  color: #F56C6C;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 31%;
}
</style>