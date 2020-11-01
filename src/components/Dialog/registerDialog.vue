<template>
  <div>
    <show-more style="margin-top: 20px" :showHeight="showHeight" :content="contentTxt"></show-more>
  </div>
  <div >
    <el-dialog :visible.sync="registerDialogVisible" @close="closeDialog"
               style="width:840px; margin: 20px auto;">
        <h2 class="title">注册</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                 style="width: 90%; margin: 0px auto;">
            <el-form-item prop="username" label="用户名">
                <el-input type="text" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手机号">
                <el-input type="tel" v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-input type="email" v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
          <el-form-item prop="code" label="验证码">
            <el-input type="text" v-model="ruleForm.code" style="width: 50%;float:left;margin-left:10%" placeholder="请输入验证码"></el-input>
            <el-button type="primary" plain style="width: 20%;  float: right"
                       @click="sendVeriCode">发送</el-button>
          </el-form-item>
<!--          <el-collapse-transition>-->
<!--            <div v-show="show3">-->
<!--                <div-->
<!--                    v-for="item in classed"-->
<!--                    :key="item.id"-->
<!--                    class='institute'-->
<!--                >{{ item.text }}</div>-->
<!--              </div>-->
<!--          </el-collapse-transition>-->
<!--          <el-button class="show_more" type="text" @click="show3=!show3">{{word}}</el-button>-->

          <el-form-item prop="country" label="国家(地区)">
                <el-select v-model="selectedCountry" placeholder="请选择国家(地区)">
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
              <el-select v-model="selectedType" placeholder="请选择机构类型">
                <el-option
                    v-for="item in instituteOptions"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="institute" label="机构">
              <el-input type="text" v-model="ruleForm.institute" placeholder="请输入机构名称"></el-input>
            </el-form-item>
            <el-form-item prop="field" label="专业领域">
              <el-select v-model="selectedField" placeholder="请选择专业领域">
                <el-option
                    v-for="item in fieldOptions"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="purpose" label="用途">
              <el-select v-model="selectedPurpose" placeholder="请选择用途">
                <el-option
                    v-for="item in purposeOptions"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>



            <el-form-item>
                <el-button style="width:47%; float: left" @click="cancel">重置</el-button>
                <el-button type="primary" style="width:47%; float:right" @click.native.prevent="register"
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
                registerDialogVisible: false,
                registering: false,
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
                  {index: '2', value: '商业用途'},
                  {index: '3', value: '其他'}
                ],
                selectedPurpose: '',
                ruleForm: {
                    username: '',
                    password: '',
                    phone: '',
                    email: '',
                    institute: '',
                    code:'',
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
                        {validator:function(rule,value,callback){
                          if (value === '') {
                            callback(new Error('请正确填写邮箱'));
                          } else {
                            if (value !== '') {
                              var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                              if(!reg.test(value)){
                                callback(new Error('请输入有效的邮箱'));
                              }
                            }else{
                              callback();
                            }}
                          },trigger: 'blur'}
                    ],
                   code: [
                    {required: true, message: '请输入验证码', trigger: 'blur'},
                  ],
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
            },


          sendVeriCode() {
            this.$refs.ruleForm.validate((valid) => {
              if (valid) {
                let that = this;
                debugger;
                debugger;
                if(typeof this.ruleForm.email==='undefined'){
                  that.$message({
                    message: "请正确填写邮箱",
                    type: 'error'
                })}
                  else{
                that.$message({
                  message: "已向该账户绑定的邮箱发送验证邮件，请查收",
                  type: 'success'
                });}
                  that.content = that.totalTime + 's后重新发送' //这里解决60秒不见了的问题
                let clock = window.setInterval(() => {
                  that.totalTime--
                  that.content = that.totalTime + 's后重新发送'
                  if (that.totalTime < 0) {     //当倒计时小于0时清除定时器
                    window.clearInterval(clock)
                    that.content = '重新发送验证码'
                    that.totalTime = 60
                  }
                },1000)
                that.correctCode = res.body.code;

                // let num = 60;
                // const timer = setInterval(function () {
                //   num--
                //   element.innerHTML = num + '秒后重新获取'
                //   element.style.color = ' #ccc'
                //   element.disabled = ' disabled'
                //   if (num === 0) {
                //     element.disabled = ''
                //     element.style.color = ' #ffa600'
                //     element.innerHTML = '获取验证码'
                //     clearInterval(timer)
                //   }
                // }, 1000);
              }
            })
          },
          verifyCode() {
            if (this.ruleForm.code == this.correctCode) {
                return true
            } else {
              this.$message({
                message: "验证码错误，请重新确认",
                type: 'error'
              });
              this.ruleForm.code = '';
              return false
            }
          },


            register() {
                debugger;
              this.$md5('holle') // bcecb35d0a12baad472fbe0392bcc043  密码加密
                this.registering = true;
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        debugger;
                        let that=this;
                        let url=that.$URL.addUser;
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
                                if (res.code == 200|| this.$options.methods.verifyCode()) {
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
            }
        },

//       components:{
//           beforeheader,
//   CollapseTransition
// },
//       computed: {
//         word: function() {
//           if (this.show3 == false) {//对文字进行处理
//             return '展开';
//           } else {
//             return '收起';
//           }
//         }
//       },


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

    .el-select {
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